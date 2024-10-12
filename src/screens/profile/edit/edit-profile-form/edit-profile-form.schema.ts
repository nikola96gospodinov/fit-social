import { checkHandleUniqueness } from "@/src/services/profile/check-handle-uniqueness.service";
import { z } from "zod";

export const editProfileSchema = (originalHandle: string | null) =>
  z
    .object({
      full_name: z.string().optional(),
      handle: z.string(),
      is_public: z.boolean(),
      bio: z.string().optional(),
    })
    .superRefine(async ({ handle }, ctx) => {
      if (handle === originalHandle) return;

      const { isUnique, error } = await checkHandleUniqueness(handle);

      if (error) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Error checking handle uniqueness",
        });
      }

      if (!isUnique) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Handle is already taken",
          path: ["handle"],
        });
      }
    });

export type EditProfileForm = z.infer<ReturnType<typeof editProfileSchema>>;
