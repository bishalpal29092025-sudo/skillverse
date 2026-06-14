import { z } from "zod";

export const profileSchema = z.object({
  headline: z.string().max(100),
  bio: z.string().max(500),
  location: z.string().max(100),
  skillsOffered: z.array(z.string()),
  skillsWanted: z.array(z.string()),
});
