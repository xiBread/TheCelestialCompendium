import { defineCollection, z } from "astro:content";

export const collections = {
	archive: defineCollection({
		type: "content",
		schema: z.object({
			title: z.string(),
			meta: z
				.object({
					index: z.boolean().default(false),
					order: z.number().optional(),
				})
				.optional(),
		}),
	}),
};
