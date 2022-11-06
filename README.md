# Sandbox (Next.js)

A sandbox project based on Next.js. Used just as a playground.

## Prerequisites

- [Node.js](https://nodejs.org/) v16

## Development

Install dependencies:

```sh
npm install
```

Run the development server:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in browser to see the result.

## Production Build

Build for production command:

```sh
npm run build
```

Production build preview command:

```sh
npm run prod
```

## Testing

Primary:

```sh
npm run test
```

Primary (Vitest interactive UI):

```sh
npm run test:ui
```

Types:

```sh
npm run test:types
```

Lint:

```sh
npm run test:lint
```

Interaction tests (Storybook):

```sh
npm run test:interactions
```

## Storybook

### Development

```sh
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) in browser to see the result.

### Build static output

```sh
npm run build-storybook
```

This will create `storybook-static` build directory with static output files. It can be served on a static website hosting afterwards (e.g. on AWS S3).
