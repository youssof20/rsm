# Vessel · From Zero to COMSOL

A local educational web app about ultrasound, vessel mechanics, resonance sonomanometry, and force-coupled ultrasound. Built around the two supplied PDFs, with particular depth on Chapter 5 of Alex Jaffe’s thesis.

## Use it online

GitHub Pages target: **https://youssof20.github.io/rsm/**. See [DEPLOYMENT.md](DEPLOYMENT.md) for step-by-step setup, privacy, and future updates. The Pages build is public once deployed; saved notes and progress stay in each browser and do not synchronize across devices.

## Run locally

Install **Node.js 22.18+** (or a newer LTS) and npm, then in this directory:

```powershell
npm ci
npm run dev
```

Open the local address printed by Vite (normally `http://127.0.0.1:5173`). To use a specific port:

```powershell
npm run dev -- --port 4178 --strictPort
```

There is no backend or account. Fonts, KaTeX, educational content, and the supplied PDFs are served locally; an internet connection is only needed for installation or opening supplemental external documentation. Open the app through Vite or another local web server, rather than double-clicking `index.html`.

For a production build:

```powershell
npm run build
npm run preview
```

`dist/` contains the standalone static build, including the PDFs. Keep this source-based study project and the supplied thesis for personal/local use unless you have appropriate redistribution rights. Source PDF pages link through the PDF viewer’s `#page=` support; if your viewer ignores it, enter the cited page manually.

## What is included

- 27 short lessons: 8 foundations, 6 RSM, 10 thesis modules (including 5 dedicated Chapter 5 lessons), 1 comparison, and 2 COMSOL bridge lessons.
- SVG teaching figures for vessel pressure, stress–strain, B/M-mode, resonance, the n = 2 mode, meshes and boundaries, collapse, and artery–vein coupling.
- An interactive forward/inverse fitting example, a seven-variable RSM equation explorer, a side-by-side paper comparison, and an educational COMSOL model tree.
- 18 active-recall prompts with written explanations, error identification, diagram labels, classifications, hints, answers, sources, and self-assessment.
- A searchable glossary, searchable source map, global concept search, lab readiness checklist, and questions for the professor.
- Local progress, per-lesson notes, written quiz answers, self-ratings, and theme preferences saved in this browser’s `localStorage`.

Progress is scoped to the browser and the site origin (hostname and port). It is not synchronized across devices. Clearing site data resets it. Mesh/exercise settings and individual label/classification selections are session-local. The app remains usable if storage is unavailable, but persistence then cannot be guaranteed.

## Project structure

```text
src/
  App.tsx                 navigation, lessons, home, glossary, recall, lab, sources
  styles.css              responsive layout and light/dark themes
  components/
    Common.tsx            ConceptCard, SourceCitation, TakeawayBox, math, tooltips
    Diagrams.tsx          SVG figures, EquationExplorer, PaperComparison, model demos
  content/
    types.ts              lesson/section/citation schemas
    foundations.ts        prerequisite teaching modules
    rsm.ts                RSM explanations, equation meanings, evidence and limits
    thesis.ts             Chapters 5–10; detailed Chapter 5 treatment
    bridge.ts             comparison and hypothetical COMSOL workflow
    glossary.ts           short definitions and context links
    recall.ts             active recall and professor discussion questions
    index.ts              curriculum order, groups, supplemental documentation
  lib/
    models.ts             explicitly synthetic teaching models
    storage.ts            browser-local persistence
public/sources/           the two original supplied PDFs
sources/
  CURRICULUM.md           dependency plan and source caveats, written before UI build
  rsm-pages.json          local-only text extraction, not committed to GitHub
  thesis-pages.json       local-only text extraction, not committed to GitHub
  *.txt                  local-only page-delimited extraction for source audit
tests/
  models.test.ts          numerical behaviour and uncertainty/penalty checks
  browser-check.mjs       browser interaction and persistence smoke tests
  content-check.mjs       all lessons, citations, equations, links, responsive layout
```

## Edit content or source references

Educational content lives in the typed data files under `src/content/`, separately from presentation. Each lesson includes prerequisites, short sections, an optional interactive diagram, three takeaways, and a recall question. `deeper`, `confusion`, and equation fields are collapsed by default.

Source-page references are stored next to each sourced section as `refs`, using `R(page, end?)` or `T(page, end?)`. They are **actual PDF pages counted from 1**, consistently across the app. The source map is generated directly from these records, so lesson citations and the source map stay in sync. Quiz citations are in `recall.ts`; teaching-figure citations are next to their implementations. Equation strings use `String.raw` to preserve LaTeX backslashes.

Keep the labels distinct:

- **Source reading**: a claim from a supplied PDF, with page reference.
- **Background concept**: general prerequisite knowledge, not attributed to the papers.
- **Interpretation**: our suggested connection or research direction.
- **Educational workflow / conceptual visualization**: a possible workflow or deliberately simplified teaching tool.

Important source qualifications are retained: the Chapter 5 6.2/6.4 mmHg discrepancy, the unusual printed K₁ value, RSM geometry/processing assumptions and early feasibility scope, Chapter 8’s transferred-model versus same-dataset fits, and Chapter 9’s dimensionality and waveform limitations. The source map lists these cautions and links to their pages. Supplemental COMSOL links are official documentation, clearly separated from the two PDFs.

## What the interactive models do

The app does **not** solve a real FEM or estimate a person’s blood pressure. It does not reproduce the authors’ code. The oscillator and deformation demonstrations explicitly use simple synthetic laws. The inverse example uses a transparent coordinate search, **not** MATLAB fminsearch/Nelder–Mead; the actual thesis algorithm is explained in the lesson. Its objective shows both mismatch and a penalty, and implements the 0.2 mm residual rule as zeroing smaller discrepancies, not subtracting that amount from all discrepancies.

The equation explorer renders the full RSM relationship, but its numeric interaction is only the dimensionless consequence of the leading scaling, holding effective density fixed. The COMSOL model tree is a labelled teaching mock-up, not a screenshot, API connection, `.mph` model, or actual solver.

## Validation

```powershell
npm test
npm run build
```

For browser checks, first start the app on port 4178 in another terminal, then:

```powershell
npx playwright install chromium
node tests/browser-check.mjs
node tests/content-check.mjs
```

The browser suite checks navigation, saved progress/notes, equation rendering, fitting controls, recall answers, diagram labels, glossary/source search, PDF availability, search dialog, themes, mobile overflow, and mobile navigation. Screenshots and its result record are written under `tmp/` (ignored by Git). Browser checks use a fresh isolated browser context and do not affect your personal study progress.

Recheck source claims and citations whenever modifying lessons. A passing build or browser test does not independently validate the scientific models.
