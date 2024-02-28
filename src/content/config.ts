import { type Render, defineCollection, z } from "astro:content";

export interface MixedEntry {
	id: string;
	slug: string;
	collection: string;
	data: {
		title?: string;
		name?: string;
		meta?: {
			index: boolean;
			order?: number;
		};
	};
	render(): Render[".mdx"];
}

const meta = z
	.object({
		index: z.boolean().default(false),
		order: z.number().optional(),
	})
	.optional();

export const collections = {
	archive: defineCollection({
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
	research: defineCollection({
		type: "content",
	}),
	beastiary: defineCollection({
		type: "content",
	}),
};
