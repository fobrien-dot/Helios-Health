import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const researchEntry = z.object({
  title: z.string(),
  authors: z.string(),
  journal: z.string(),
  year: z.number(),
  url: z.string().url(),
  summary: z.string(),
});

const lifestyleEntry = z.object({
  title: z.string(),
  guidance: z.string(),
});

const treatmentEntry = z.object({
  name: z.string(),
  category: z.enum(['medication', 'procedure', 'monitoring']),
  description: z.string(),
});

const conditions = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/conditions' }),
  schema: z.object({
    name: z.string(),
    shortName: z.string(),
    alsoKnownAs: z.array(z.string()).default([]),
    summary: z.string(),
    overview: z.object({
      whatIsIt: z.string(),
      keyPoints: z.array(z.string()),
    }),
    research: z.array(researchEntry),
    lifestyle: z.array(lifestyleEntry),
    treatments: z.array(treatmentEntry),
    lastReviewed: z.string(),
    disclaimer: z.string(),
  }),
});

export const collections = { conditions };
