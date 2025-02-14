CREATE OR REPLACE FUNCTION search_exercises(
    search_query TEXT DEFAULT '',
    p_equipment TEXT[] DEFAULT ARRAY[]::TEXT[],
    p_muscle_groups TEXT[] DEFAULT ARRAY[]::TEXT[],
    p_limit INTEGER DEFAULT 25,
    p_offset INTEGER DEFAULT 0
) 
RETURNS TABLE (
    id UUID,
    name TEXT,
    equipment_id UUID,
    equipment_name TEXT,
    muscle_group_id UUID,
    muscle_group_name TEXT,
    image_url TEXT,
    instructions TEXT[],
    measurement_type exercise_measurement_type,
    total_count BIGINT
) AS $$
DECLARE
    v_equipment_ids UUID[];
    v_muscle_group_ids UUID[];
BEGIN
    -- Get equipment IDs if equipment names are provided
    IF array_length(p_equipment, 1) > 0 THEN
        SELECT array_agg(equipment.id) INTO v_equipment_ids
        FROM equipment
        WHERE equipment.name = ANY(p_equipment);
    END IF;

    -- Get muscle group IDs if muscle group names are provided
    IF array_length(p_muscle_groups, 1) > 0 THEN
        SELECT array_agg(muscle_groups.id) INTO v_muscle_group_ids
        FROM muscle_groups
        WHERE muscle_groups.name = ANY(p_muscle_groups);
    END IF;

    RETURN QUERY
    WITH filtered_exercises AS (
        SELECT 
            e.id,
            e.name,
            e.equipment_id,
            eq.name as equipment_name,
            e.muscle_group_id,
            mg.name as muscle_group_name,
            e.image_url,
            e.instructions,
            e.measurement_type
        FROM exercises e
        LEFT JOIN equipment eq ON e.equipment_id = eq.id
        LEFT JOIN muscle_groups mg ON e.muscle_group_id = mg.id
        WHERE 
            (search_query = '' OR e.name ILIKE '%' || search_query || '%')
            AND (array_length(v_equipment_ids, 1) IS NULL OR e.equipment_id = ANY(v_equipment_ids))
            AND (array_length(v_muscle_group_ids, 1) IS NULL OR e.muscle_group_id = ANY(v_muscle_group_ids))
    )
    SELECT 
        fe.*,
        COUNT(*) OVER() AS total_count
    FROM filtered_exercises fe
    ORDER BY 
        CASE 
            WHEN fe.name ILIKE search_query THEN 0
            WHEN fe.name ILIKE search_query || '%' THEN 1
            ELSE 2
        END,
        fe.name
    LIMIT p_limit
    OFFSET p_offset;
END;
$$ LANGUAGE plpgsql;