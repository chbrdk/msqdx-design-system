import { hexToRgb } from './utils';
// @ts-ignore
import tokens from '../../../../tokens/dist/tokens.json';

export async function syncTokens() {
    console.log('Starting token sync...');

    if (!tokens) {
        console.error('Tokens file not found. Please run "npm run build:json" in packages/tokens.');
        figma.notify('Error: Tokens JSON not found. Run "npm run build:json" first.');
        return;
    }

    // Sync Colors
    if (tokens.MSQDX_COLORS) {
        console.log('Syncing colors...');
        traverseColors(tokens.MSQDX_COLORS);
        figma.notify('Colors synced successfully!');
    } else {
        figma.notify('No colors found in tokens.');
    }
}

function traverseColors(obj: any, prefix = '') {
    for (const key in obj) {
        const value = obj[key];
        // Create clean name: brand/purple instead of brand.purple
        const name = prefix ? `${prefix}/${key}` : key;

        if (typeof value === 'string' && (value.startsWith('#') || value.startsWith('rgba'))) {
            // Only process hex for now. RGB requires parsing which hexToRgb handles only for hex.
            if (value.startsWith('#')) {
                createColorStyle(name, value);
            }
        } else if (typeof value === 'object' && value !== null) {
            traverseColors(value, name);
        }
    }
}

function createColorStyle(name: string, hex: string) {
    const styles = figma.getLocalPaintStyles();
    let style = styles.find(s => s.name === name);

    if (!style) {
        style = figma.createPaintStyle();
        style.name = name;
    }

    const { r, g, b } = hexToRgb(hex);

    style.paints = [{
        type: 'SOLID',
        color: { r, g, b }
    }];
}
