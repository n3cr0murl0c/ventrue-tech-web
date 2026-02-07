import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('Ventrue Tech Team'),
    tags: z.array(z.string()),
    lang: z.enum(['es', 'en']).default('es'),
    featured: z.boolean().default(false),
    readTime: z.number().optional(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    technologies: z.array(z.string()),
    link: z.string().optional(),
    github: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  blog,
  projects,
};
