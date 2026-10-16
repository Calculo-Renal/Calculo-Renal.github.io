import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const chapter = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/chapter' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
  }),
});

export const collections = { chapter };