# React Portfolio

## Live Site

- Azure Static Web Apps: https://www.thientrandinh.com
- GitHub Pages (legacy): https://chaozs.github.io/Chaozs.github.io/

## Setup

Install dependencies:

```bash
npm install
```

## Development

Start the dev server:

```bash
npm run start
```

## Build

Create a production build:

```bash
npm run build
```

The production build is generated in `dist/`.

Preview the production build locally:

```bash
npm run preview
```

## Deploy

Legacy GitHub Pages deployment publishes the `dist` folder:

```bash
npm run deploy
```

Azure Static Web Apps builds from source automatically through its GitHub integration, so `dist` does not need to be committed for Azure deployment.
