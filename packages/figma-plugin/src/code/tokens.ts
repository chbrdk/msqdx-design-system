import { hexToRgb, parseRgba, remToPx, parseColor, type FigmaRgba } from './utils';
// @ts-ignore
import tokens from '../../../tokens/dist/tokens.json';

const COLLECTION_NAME = 'MSQDX Design Tokens';
const PREFIX = 'MSQDX_';

type PrimitiveValue = { path: string; type: 'color' | 'float' | 'string'; value: FigmaRgba | number | string };

function collectPrimitives(obj: unknown, prefix = ''): PrimitiveValue[] {
    const result: PrimitiveValue[] = [];

    if (obj === null || obj === undefined) return result;

    if (typeof obj === 'string') {
        const name = prefix.replace(/^\.?MSQDX_/, '').replace(/\./g, '/');
        if (obj.startsWith('#') || obj.startsWith('rgba')) {
            const color = parseColor(obj);
            if (color) result.push({ path: name, type: 'color', value: color });
        } else if (/^[\d.]+rem$/.test(obj)) {
            result.push({ path: name, type: 'float', value: remToPx(obj) });
        } else if (/^[\d.]+em$/.test(obj)) {
            const em = parseFloat(obj);
            result.push({ path: name, type: 'float', value: em });
        } else if (/^-?[\d.]+$/.test(obj)) {
            result.push({ path: name, type: 'float', value: parseFloat(obj) });
        } else if (obj === 'none' || obj === 'cover' || obj === 'contain' || /^[\w\s",-]+$/.test(obj)) {
            result.push({ path: name, type: 'string', value: obj });
        }
        return result;
    }

    if (typeof obj === 'number') {
        const name = prefix.replace(/^\.?MSQDX_/, '').replace(/\./g, '/');
        result.push({ path: name, type: 'float', value: obj });
        return result;
    }

    if (typeof obj === 'object') {
        for (const key in obj as Record<string, unknown>) {
            const val = (obj as Record<string, unknown>)[key];
            const newPrefix = prefix ? `${prefix}/${key}` : key;
            result.push(...collectPrimitives(val, newPrefix));
        }
    }

    return result;
}

/** Skip only pure mapping tables (icon names, keyframe names) - no design values */
function shouldSkipToken(key: string): boolean {
    return key === 'MSQDX_ICON_NAMES' || key === 'MSQDX_ANIMATION_KEYFRAMES';
}

export async function syncTokens() {
    console.log('Starting token sync...');

    if (!tokens) {
        console.error('Tokens file not found. Please run "npm run build:json" in packages/tokens.');
        figma.notify('Error: Tokens JSON not found. Run "npm run build:json" first.');
        return;
    }

    const collections = await figma.variables.getLocalVariableCollectionsAsync();
    let collection = collections.find(c => c.name === COLLECTION_NAME);

    if (!collection) {
        collection = figma.variables.createVariableCollection(COLLECTION_NAME);
    }

    const modeId = collection.modes[0].modeId;
    const existingVars = await figma.variables.getLocalVariablesAsync();
    const existingStyles = { paint: figma.getLocalPaintStyles(), text: figma.getLocalTextStyles() };
    const varByName = new Map<string, Variable>();
    for (const v of existingVars) {
        if (v.variableCollectionId === collection.id) varByName.set(v.name, v);
    }

    let colorsCreated = 0;
    let varsCreated = 0;
    const errors: string[] = [];

    for (const key of Object.keys(tokens)) {
        if (!key.startsWith(PREFIX) || shouldSkipToken(key)) continue;

        const primitives = collectPrimitives(tokens[key], key);

        for (const p of primitives) {
            const fullPath = p.path.replace(/^MSQDX_[^/]+/, m => m.replace('MSQDX_', ''));
            const fullPathLegacy = p.path.replace(/^[^/]+\//, '');

            if (p.type === 'color') {
                const rgba = p.value as FigmaRgba;
                const varName = `colors/${fullPathLegacy}`;

                let variable = varByName.get(varName);
                if (!variable) {
                    variable = figma.variables.createVariable(varName, collection, 'COLOR');
                    varByName.set(varName, variable);
                    varsCreated++;
                }
                variable.setValueForMode(modeId, { r: rgba.r, g: rgba.g, b: rgba.b, a: rgba.a ?? 1 });

                let style = existingStyles.paint.find(s => s.name === varName);
                if (!style) {
                    style = figma.createPaintStyle();
                    style.name = varName;
                    colorsCreated++;
                }
                const solidPaint: SolidPaint = {
                    type: 'SOLID',
                    color: { r: rgba.r, g: rgba.g, b: rgba.b },
                    opacity: rgba.a ?? 1,
                };
                style.paints = [figma.variables.setBoundVariableForPaint(solidPaint, 'color', variable)];
            } else if (p.type === 'float') {
                const num = p.value as number;
                if (Number.isNaN(num) || !Number.isFinite(num)) continue;
                const varName = `numbers/${fullPath}`;

                let variable = varByName.get(varName);
                if (!variable) {
                    variable = figma.variables.createVariable(varName, collection, 'FLOAT');
                    varByName.set(varName, variable);
                    varsCreated++;
                }
                variable.setValueForMode(modeId, num);
            } else if (p.type === 'string' && (fullPath.includes('fontFamily') || fullPath.includes('font') || fullPath.includes('Font'))) {
                const str = p.value as string;
                const varName = `strings/${fullPathLegacy}`;

                let variable = varByName.get(varName);
                if (!variable) {
                    variable = figma.variables.createVariable(varName, collection, 'STRING');
                    varByName.set(varName, variable);
                    varsCreated++;
                }
                variable.setValueForMode(modeId, str);
            }
        }
    }

    figma.notify(`Tokens synced: ${colorsCreated} paint styles, ${varsCreated} variables`);
}
