# Sandbox (Next.js)

A sandbox project based on [Next.js](https://nextjs.org/). Used just as a playground.

## Prerequisites

- [Node.js](https://nodejs.org/) v16

## Available NPM Scripts

| Name | Command | Description |
| --- | --- | --- |
| dev | `npm run dev` | Runs [Next.js](https://nextjs.org/) application in development mode on http://localhost:3000 |
| build | `npm run build` | Builds [Next.js](https://nextjs.org/) application for production into `.next` directory. It can be served on SaaS platform like [Vercel](https://vercel.com/). |
| prod | `npm run prod` | Previews [Next.js](https://nextjs.org/) application production build from `.next` directory |
| test | `npm run test` | Runs primary tests using [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) frameworks |
| test:ui | `npm run test:ui` | Runs primary tests inside interactive UI sandbox by Vitest, useful for development |
| test:types | `npm run test:types` | Runs types check by [TypeScript CLI](https://www.typescriptlang.org/docs/handbook/compiler-options.html) |
| test:lint | `npm run test:lint` | Runs [ESLint](https://nextjs.org/docs/basic-features/eslint) check provided by [Next.js](https://nextjs.org/) |
| storybook | `npm run storybook` | Runs [Storybook](https://storybook.js.org) in development mode on http://localhost:6006. |
| build-storybook | `npm run build-storybook` | Builds [Storybook](https://storybook.js.org) static output files into `storybook-static` directory. It can be served on a static website hosting like [Netlify](https://www.netlify.com/). |
