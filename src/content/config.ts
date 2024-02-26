import { defineCollection, z } from "astro:content";

const meta = z
	.object({
		index: z.boolean().default(false),
		order: z.number().optional(),
	})
	.optional();

export const collections = {
	all: defineCollection({
		type: "content",
		schema: z.union([
			z.object({
				name: z.string(),
				title: z.never().optional(),
				meta,
			}),
			z.object({
				name: z.never().optional(),
				title: z.string(),
				meta,
			}),
		]),
	}),
};
