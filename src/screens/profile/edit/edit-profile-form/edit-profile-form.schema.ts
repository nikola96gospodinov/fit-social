import { z } from "zod";

export const editProfileSchema = z.object({
  full_name: z.string().optional(),
  username: z.string(),
  is_public: z.boolean(),
  bio: z.string().optional(),
});

export type EditProfileForm = z.infer<typeof editProfileSchema>;
