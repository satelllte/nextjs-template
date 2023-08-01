# Next.js Template

Next.js personal template.

## What's included

- [Next.js 13](https://nextjs.org/) with `/app` router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/)
- [ESLint](https://eslint.org/) configuration with lots of good rules based on [XO](https://github.com/xojs/xo)
- [Prettier](https://prettier.io/)
- [GitHub Actions](https://github.com/features/actions) CI/CD

## Where it's used

[![DSP Terms](https://img.shields.io/static/v1?&message=DSP%20Terms&style=flat&colorA=000000&colorB=000000&label=GitHub&logo=github&logoColor=ffffff)](https://github.com/satelllte/dsp-terms)

[![AudioParam Visualization](https://img.shields.io/static/v1?&message=AudioParam%20Visualization&style=flat&colorA=000000&colorB=000000&label=GitHub&logo=github&logoColor=ffffff)](https://github.com/satelllte/audioparam-visualization)

## How to use this template

### 1. Create a new repository

Click on the **"Use this template"** button on the top of the page to create a new repository based on this template. Also you can download it as a ZIP or clone it.

### 2. After checking out your clone of the repository

Set the required Node.js version specified in `.nvmrc` file:

```sh
nvm use
```

Install dependencies:

```sh
npm install
```

_(Optional, but recommended)_ Upgrade dependencies to the latest versions:

```sh
npm run upgrade
```

_(Optional, but recommended)_ Reset the version of your clone to the initial `0.1.0` version:

```sh
npm version 0.1.0
```

Lastly, you can update your new project name / details in `package.json`, `README.md`, `LICENSE`, etc.

And finally run the local development of it:

```sh
npm run dev
```

### 3. Deploy

Deploy your project to [Vercel](https://vercel.com/) or other SaaS.

As a miscallenous note, there's an ability to skip deployments on Vercel by including `[skip deploy]` text into the commit message. This is useful for skipping some out of source code edits or dependabot updates. To configure it in your Vercel project, go to "Settings" -> "Git" -> "Ignored Build Step" and add this line:

```sh
git log -1 --pretty=oneline --abbrev-commit | grep -w "\[skip deploy\]" && exit 0 || exit 1
```

## Development

See [DEVELOPMENT](./DEVELOPMENT.md) guide.
