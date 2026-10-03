# Semantika

Semantika is an interactive learning hub for semantic HTML5 and web accessibility. It helps users understand when to use semantic elements like `header`, `main`, `nav`, `article`, `section`, `aside`, `footer`, and how these choices improve accessibility, document structure, and SEO.

## Features

- Interactive element library with semantic HTML explanations
- Visual comparison between semantic elements and generic `div`/`span`
- Page builder to compose accessible page structures
- Accessibility linter for HTML quality checks
- Quiz mode for learning reinforcement
- Cheatsheet for quick reference
- Language toggle (Indonesian/English inspired by project copy)
- Dark mode support

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Lucide icons
- Motion library

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Run the app locally

```bash
npm run dev
```

The app will start on port `3000`.

### Build for production

```bash
npm run build
```

### Run type checks

```bash
npm run lint
```

## Project Structure

```text
Semantika/
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── types.ts
│   ├── components/
│   ├── data/
│   └── utils/
└── public/
```

## Main Scripts

- `npm run dev` — start the Vite development server
- `npm run build` — build the production bundle
- `npm run preview` — preview the built app
- `npm run lint` — run TypeScript type checking

## Notes

This project is focused on educational use and demonstrates best practices for semantic HTML and accessibility. It is intended to support learning and experimentation in web development.

## License

This project does not currently declare a license.
