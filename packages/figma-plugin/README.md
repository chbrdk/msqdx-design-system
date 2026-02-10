# MSQDX Sync Plugin

Figma plugin to synchronize Design Tokens and Components from `msqdx-design-system`.

## Setup

### 1. Build Tokens
First, you need to generate the `tokens.json` file from your design tokens package.

```bash
cd packages/tokens
npm install
npm run build:json
```

This will create `packages/tokens/dist/tokens.json`.

### 2. Build Plugin
Install dependencies and build the plugin code.

```bash
cd packages/figma-plugin
npm install
npm run build
```

This will create `packages/figma-plugin/dist/code.js` and `packages/figma-plugin/dist/index.html`.

### 3. Load in Figma
- Open Figma Desktop App.
- Go to **Plugins > Development > Import plugin from manifest...**
- Select `packages/figma-plugin/manifest.json`.

## Usage

- Open the plugin in a file.
- Click **Sync Design Tokens** to update Local Styles (Colors).
- Click **Sync Components** to create components on the current page.
