import { checkHandleUniqueness } from "@/src/services/profile/check-handle-uniqueness.service";
import { z } from "zod";

export const editProfileSchema = (id: string) =>
  z
    .object({
      full_name: z.string().optional(),
      handle: z.string(),
      is_public: z.boolean(),
      bio: z.string().optional(),
    })
    .superRefine(async ({ handle }, ctx) => {
      try {
        const { data, error } = await checkHandleUniqueness(handle);

        if (error && error.code !== "PGRST116") throw new Error(error.message);

        if (data && data.id !== id) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Handle is already taken",
            path: ["handle"],
          });
        }
      } catch (error) {
        console.error(error);

        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Error checking handle uniqueness",
        });
      }
    });

export type EditProfileForm = z.infer<ReturnType<typeof editProfileSchema>>;
