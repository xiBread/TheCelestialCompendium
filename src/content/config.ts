import { defineCollection, z } from "astro:content";

export const collections = {
	archive: defineCollection({
		type: "content",
		schema: ({ image }) =>
			z.object({
				title: z.string(),
				description: z.string().optional(),
				meta: z
					.object({
						index: z.boolean().default(false),
						order: z.number().default(Infinity),
					})
					.default({}),
				/**
				 * byr -> birth year
				 * hgt -> height
				 * wgt -> weight
				 * hcl -> hair color
				 * ecl -> eye color
				 */
				profile: z
					.object({
						portrait: image().optional(),
						title: z.string().optional(),
						aliases: z.array(z.string()).default([]),
						sex: z.enum(["M", "F"]).optional(),
						age: z.number().optional(),
						byr: z.string().optional(),
						hgt: z
							.string()
							.regex(/\d\d?'(?:\d\d?")?/)
							.optional(),
						wgt: z.number().optional(),
						hcl: z.string().optional(),
						ecl: z.string().optional(),
					})
					.optional(),
			}),
	}),
	// For timeline.yml only
	data: defineCollection({
		type: "data",
		schema: ({ image }) =>
			z.array(
				z.object({
					name: z.string(),
					date: z.string(),
					image: image(),
					description: z.string(),
				}),
			),
	}),
};
