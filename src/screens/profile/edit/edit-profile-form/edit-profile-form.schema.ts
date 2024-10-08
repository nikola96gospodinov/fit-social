import { z } from "zod";

export const editProfileSchema = z.object({
  full_name: z.string().optional(),
  username: z.string(),
  is_public: z.boolean(),
});

export type EditProfileForm = z.infer<typeof editProfileSchema>;
