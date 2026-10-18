# barrio. — frontend

> 🚧 **Provisional documentation.** This project is under active development (IT Academy Barcelona Activa bootcamp). This README will be filled in as the weeks in `ROADMAP.md` progress — screenshots, a public demo link, and the presentation script will be added in Week 4.

## What barrio. is

A neighborhood time bank: people exchange help (classes, repairs, moving, pet and plant care) paying in **hours**, not money. Final bootcamp project, merging Project 4 (dashboards and data visualization) and the Final Project.

This repository is the **frontend**. The backend lives in a separate repository: [`barrio-backend`](#) *(add the link here once it's public)*.

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4
- React Router
- Firebase Authentication (Auth only)
- TanStack Query (server state)
- React Hook Form + Zod (forms and validation)
- Leaflet + react-leaflet (map)
- react-big-calendar (calendar)
- Recharts (stats)
- Radix UI (accessible components)
- Motion, formerly Framer Motion (animations)
- Vitest + Testing Library + jest-cucumber (testing, with acceptance criteria in Gherkin)

See `docs/STACK-SETUP.md` for details and the install order for each library.

## Project structure

```
src/
  components/    ← reusable components (Button, TicketCard, Chip, Toggle...)
  features/      ← one folder per feature (auth, tickets, wallet, map, calendar, stats, chat)
  hooks/
  services/      ← calls to the own API, one file per resource
  types/         ← shared TS types
  pages/         ← one per route
  mocks/         ← sample data while a part isn't connected to the backend yet
docs/
  BRIEFING.md
  ROADMAP.md
  KANBAN.md
  gherkin/       ← one .feature per user story
```

## Running it locally

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file at the root with:
   ```
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_API_BASE_URL=http://localhost:3000
   ```
   *(ask me for the keys if you need them — they're not committed, for security)*
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. You also need the [backend](#) running locally (defaults to `http://localhost:3000`) for the app to have real data.

## Tests

```bash
npm run test
```
Tests cover the acceptance criteria written in Gherkin (`docs/gherkin/*.feature`).

## Project status

In development — follow week-by-week progress in `docs/ROADMAP.md`.

## Public demo

*(pending — will be added in Week 4 of the roadmap, along with screenshots)*

---

Individual project by Berta González — IT Academy Barcelona Activa.