import { defineCollection, z } from "astro:content";

export const collections = {
	archive: defineCollection({
		type: "content",
		schema: z.object({
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
					aliases: z.array(z.string()).optional(),
					sex: z.enum(["M", "F"]).optional(),
					age: z.number().optional(),
					byr: z.string().optional(),
					hgt: z
						.string()
						.regex(/\d\d?'(?:\d\d?")?/)
						.optional(),
					wgt: z.string().optional(),
					hcl: z.string().optional(),
					ecl: z.string().optional(),
				})
				.optional(),
		}),
	}),
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
