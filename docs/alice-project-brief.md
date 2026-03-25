# ALICE Project Brief

## Name

ALICE: Astral Local Intelligence and Content Engine

## Product Thesis

ALICE is a focused growth platform for Astral's local search presence. It converts product brochures and structured product knowledge into city-specific SEO content, connects that content to dealer and Google Business Profile activity, and gives the team a practical system for ranking, publishing, and improving local discoverability over time.

## V1 Goal

Launch a narrow but complete loop for `Astral Pipes`:

- ingest brochures and spec sheets
- extract clean product records into a PKB
- generate reviewable local blogs for city and keyword pairs
- publish approved drafts to WordPress
- track the first wave of content performance

## V1 Modules

1. PKB ingestion with OCR and manual approval
2. Product record management with searchable fields
3. Quick Mode blog generation
4. Review queue with score, edit, reject, and regenerate states
5. WordPress publish flow with title, meta, slug, and schema fields
6. Basic keyword-city tracking dashboard

## Recommended Boundaries

- Start with one brand: `Astral Pipes`
- Start with top-priority cities only
- Keep publishing human-reviewed in V1
- Defer multilingual, microsites, citation submissions, and auto-replies until the core loop is stable

## Phase Order

### Phase 1

Build the ingestion, PKB, quick generation, review, and publish workflow.

### Phase 2

Add SERP-assisted drafting, bulk generation, topical clusters, and rank tracking.

### Phase 3

Add GBP operations, review intelligence, and local profile consistency tools.

### Phase 4

Add regional language support, citation management, and ROI analytics.

## Build Notes

- The current repo already contains an Astral web app shell in Next.js.
- ALICE is added as a separate project surface at `/alice`.
- If this becomes the primary product, the next step should be to create dedicated data models and app routes for ALICE workflows instead of treating it as a static project page.
