import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    canonicalPath: z.string().optional(),
    redirectTo: z.string().optional(),
    rankedItems: z
      .array(
        z.object({
          name: z.string(),
          url: z.string().optional(),
          description: z.string().optional(),
        }),
      )
      .optional(),
    faqs: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        }),
      )
      .optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
