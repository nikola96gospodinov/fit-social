CREATE OR REPLACE FUNCTION search_profiles(search_query TEXT)
RETURNS TABLE (
    id UUID,
    handle TEXT,
    full_name TEXT,
    bio TEXT,
    is_public BOOLEAN,
    home_gym_id TEXT,
    home_gym_name TEXT,
    measurement_system measurement_system, 
    search_rank FLOAT
) AS $$
BEGIN
    RETURN QUERY
    WITH search_terms AS (
        SELECT unnest(string_to_array(lower(search_query), ' ')) AS term
    ),
    ranked_results AS (
        SELECT 
            *,
            (
                -- Exact handle or name match (highest weight)
                CASE WHEN lower(p.handle) = lower(search_query) THEN 10.0 ELSE 0.0 END +
                -- name (only if full_name is not null)
                CASE WHEN p.full_name IS NOT NULL AND lower(p.full_name) = lower(search_query) THEN 10.0 ELSE 0.0 END +
                
                -- Partial matches in handle
                (SELECT COUNT(*) FROM search_terms 
                WHERE lower(p.handle) LIKE '%' || term || '%') * 3.0 +
                
                -- Partial matches in name (only if full_name is not null)
                (SELECT COUNT(*) FROM search_terms 
                WHERE p.full_name IS NOT NULL AND lower(p.full_name) LIKE '%' || term || '%') * 2.0 +
                
                -- Similarity matches
                (SELECT MAX(similarity(lower(p.handle), term)) FROM search_terms) +
                (SELECT COALESCE(MAX(
                    CASE 
                        WHEN p.full_name IS NOT NULL THEN similarity(lower(p.full_name), term)
                        ELSE 0
                    END
                ), 0) FROM search_terms)
            ) AS search_rank
        FROM profiles p
        WHERE
            EXISTS (
                SELECT 1 FROM search_terms
                WHERE 
                    lower(p.handle) LIKE '%' || term || '%' OR
                    (p.full_name IS NOT NULL AND lower(p.full_name) LIKE '%' || term || '%') OR
                    similarity(lower(p.handle), term) > 0.2 OR
                    (p.full_name IS NOT NULL AND similarity(lower(p.full_name), term) > 0.2)
            )
    )
    SELECT *
    FROM ranked_results
    WHERE ranked_results.id != auth.uid()
    ORDER BY ranked_results.search_rank DESC;
END;
$$ LANGUAGE plpgsql;