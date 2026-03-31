# Software Engineering Process Explorer (React + Vite)

A searchable, review-enabled learning site for modern software engineering processes, built with React and Vite.

## Features

- Search software engineering topics by keyword
- View summaries for Agile, DevOps, CI/CD, SRE, AI-assisted workflows
- Leave rating + comment feedback and store it in-memory
- Mobile-responsive layout

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Build

```bash
npm run build
```

## Deploy on Vercel

1. Connect your GitHub repo to Vercel.
2. Set framework preset to `Vite` (Vercel auto-detects usually).
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy.

> Existing `VITE_` environment variables are not required for this app.

## Notes

- This app stores review feedback in client state (refresh clears it). For production, connect to a backend or database.
- To add new topics, edit `src/App.jsx` `topics` array.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
