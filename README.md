# Helios

Helios pairs a plain-language overview of a medical condition with a peer-reviewed research library, lifestyle guidance, and treatment information — all clearly sourced, never scraped from forums or anecdotes.

## Project structure

```text
/
├── src/
│   ├── content/
│   │   └── conditions/       # one JSON file per condition — this is the actual content
│   ├── content.config.ts     # schema that every conditions/*.json file is validated against
│   ├── components/           # Overview, ResearchLibrary, Lifestyle, Treatments, etc.
│   ├── layouts/               # BaseLayout, ConditionLayout
│   └── pages/
│       ├── index.astro       # home page, lists every condition
│       └── conditions/[slug].astro   # renders any conditions/*.json file automatically
└── package.json
```

Adding a condition never requires a new `.astro` file — drop a new JSON file in `src/content/conditions/` and it's automatically routed to `/conditions/<filename>/`.

## Adding or editing a condition page

1. `npm install` (first time only)
2. Create or edit a file in `src/content/conditions/<slug>.json`, matching this shape (defined in `src/content.config.ts`):

   ```json
   {
     "name": "Condition name",
     "shortName": "Short form",
     "alsoKnownAs": ["Other names"],
     "summary": "One-sentence summary.",
     "category": "rare-disease",
     "symptoms": ["plain-language phrase someone might search for"],
     "overview": {
       "whatIsIt": "Plain-language explanation.",
       "keyPoints": ["Key point 1", "Key point 2"]
     },
     "research": [
       {
         "title": "Study title",
         "authors": "Author A, Author B, et al.",
         "journal": "Journal name",
         "year": 2024,
         "url": "https://pubmed.ncbi.nlm.nih.gov/...",
         "summary": "Plain-language summary of the finding.",
         "sourceType": "peer-reviewed-journal"
       }
     ],
     "lifestyle": [
       { "title": "Diet & nutrition", "guidance": "..." }
     ],
     "treatments": [
       { "name": "Treatment name", "category": "medication", "description": "..." }
     ],
     "questionsToAsk": ["A question worth bringing to an appointment."],
     "lastReviewed": "YYYY-MM-DD",
     "nextReviewDue": "YYYY-MM-DD",
     "changelog": [
       { "date": "YYYY-MM-DD", "summary": "What changed in this update." }
     ],
     "disclaimer": "Standard medical disclaimer."
   }
   ```

   - `category` must be one of `rare-disease`, `cancer`, or `chronic-autoimmune` (matches the homepage filters).
   - `symptoms` are plain-language terms the homepage search matches against, so people who don't know the condition's name can still find it.
   - `research[].sourceType` must be one of `peer-reviewed-journal`, `institution`, or `advocacy-org`.
   - `treatments[].category` must be one of `medication`, `procedure`, or `monitoring`.
   - `questionsToAsk` and `changelog` default to an empty array if omitted, but every condition should have at least a few starter questions and one changelog entry for when it was first published.

3. `npm run dev` and check `http://localhost:4321/conditions/<slug>/` renders correctly.
4. `npm run build` — this validates your JSON against the schema and will fail with a clear error if a field is missing or the wrong type.

Only cite real, verifiable sources (PubMed, journal, or clinical-guideline links) — this is health information people may act on, not filler content.

## Contributing via pull request

This repo uses a branch-and-PR workflow; nothing gets pushed straight to `main`.

1. `git checkout main && git pull`
2. `git checkout -b content/<short-description>` (e.g. `content/add-iga-nephropathy`)
3. Make your changes, and verify with `npm run dev` and `npm run build`
4. `git add <files>` then `git commit -m "..."`
5. `git push -u origin content/<short-description>`
6. Open a pull request against `main` — GitHub prints a direct link after the push, or run `gh pr create` if you have the GitHub CLI installed

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`              | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build the production site to `./dist/`           |
| `npm run preview`         | Preview the build locally, before deploying      |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
