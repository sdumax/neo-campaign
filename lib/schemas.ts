import { z } from "zod";

export const creatorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  socialMedia: z.string().min(1, "Social media links are required"),
  message: z.string().optional(),
  privacy: z.literal(true, {
    error: "You must agree to the privacy policy",
  }),
});

export const brandSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  company: z.string().optional(),
  website: z.url("Invalid URL"),
  budget: z.string().min(1, "Budget is required"),
  message: z.string().optional(),
  privacy: z.literal(true, {
    error: "You must agree to the privacy policy",
  }),
});

export type CreatorInput = z.infer<typeof creatorSchema>;
export type BrandInput = z.infer<typeof brandSchema>;
