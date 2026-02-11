/**
 * State-of-the-art Button sync: variants via combineAsVariants, all values from Figma variables.
 * Requires Sync Design Tokens first.
 */
// @ts-ignore
import tokens from '../../../tokens/dist/tokens.json';
import { remToPx } from './utils';

const COLLECTION_NAME = 'MSQDX Design Tokens';
const BUTTON_SET_NAME = 'MSQDX/Button';

type Variant = 'Contained' | 'Outlined' | 'Text' | 'Glass';
type BrandColor = 'Purple' | 'Yellow' | 'Pink' | 'Orange' | 'Green';
type Size = 'Small' | 'Medium' | 'Large';
type Radius = 'Default' | 'Square' | 'Rounded';

const VARIANTS: Variant[] = ['Contained', 'Outlined', 'Text', 'Glass'];
const COLORS: BrandColor[] = ['Purple', 'Yellow', 'Pink', 'Orange', 'Green'];
const SIZES: Size[] = ['Small', 'Medium', 'Large'];
const RADII: Radius[] = ['Default', 'Square', 'Rounded'];

const COLOR_VAR_NAMES: Record<BrandColor, string> = {
    Purple: 'colors/brand/purple',
    Yellow: 'colors/brand/yellow',
    Pink: 'colors/brand/pink',
    Orange: 'colors/brand/orange',
    Green: 'colors/brand/green',
};
const TEXT_ON_BRIGHT = 'colors/brand/black';
const TEXT_ON_DARK = 'colors/brand/white';

function sizeKey(s: Size): 'small' | 'medium' | 'large' {
    return s.toLowerCase() as 'small' | 'medium' | 'large';
}
function radiusKey(r: Radius): 'default' | 'square' | 'rounded' {
    return r.toLowerCase() as 'default' | 'square' | 'rounded';
}

/** Variable names as created by syncTokens (numbers/BUTTON/...) */
function sizeVarPath(size: Size, field: string): string {
    const sk = sizeKey(size);
    return `numbers/BUTTON/size/${sk}/${field}`;
}
function radiusVarPath(radius: Radius): string {
    const rk = radiusKey(radius);
    return `numbers/BUTTON/borderRadius/${rk}`;
}

export async function syncButton() {
    const collections = await figma.variables.getLocalVariableCollectionsAsync();
    const collection = collections.find(c => c.name === COLLECTION_NAME);
    if (!collection) {
        figma.notify('Run "Sync Design Tokens" first.');
        return;
    }

    const allVars = await figma.variables.getLocalVariablesAsync();
    const varByName = new Map<string, Variable>();
    for (const v of allVars) {
        if (v.variableCollectionId === collection.id) varByName.set(v.name, v);
    }

    const getVar = (name: string): Variable | undefined => varByName.get(name);

    const colorVars: Record<BrandColor, Variable> = {} as Record<BrandColor, Variable>;
    for (const c of COLORS) {
        const v = getVar(COLOR_VAR_NAMES[c]);
        if (!v) {
            figma.notify(`Variable ${COLOR_VAR_NAMES[c]} missing. Re-run Sync Design Tokens.`);
            return;
        }
        colorVars[c] = v;
    }
    const textOnDark = getVar(TEXT_ON_DARK);
    const textOnBright = getVar(TEXT_ON_BRIGHT);
    if (!textOnDark || !textOnBright) {
        figma.notify('Variables colors/brand/white or black missing. Re-run Sync Design Tokens.');
        return;
    }

    const sizeVars: Record<Size, { height: Variable; paddingH: Variable; paddingV: Variable; gap: Variable; fontSize: Variable } | null> = {} as Record<Size, any>;
    for (const size of SIZES) {
        const h = getVar(sizeVarPath(size, 'height'));
        const pH = getVar(sizeVarPath(size, 'padding/horizontal'));
        const pV = getVar(sizeVarPath(size, 'padding/vertical'));
        const gap = getVar(sizeVarPath(size, 'gap'));
        const fs = getVar(sizeVarPath(size, 'fontSize'));
        if (!h || !pH || !pV || !gap || !fs) {
            figma.notify(`Size variables for ${size} missing. Ensure MSQDX_BUTTON tokens sync creates numbers/size/*.`);
            return;
        }
        sizeVars[size] = { height: h, paddingH: pH, paddingV: pV, gap, fontSize: fs };
    }

    const radiusVars: Record<Radius, Variable | undefined> = {} as Record<Radius, Variable | undefined>;
    for (const r of RADII) {
        radiusVars[r] = getVar(radiusVarPath(r));
    }

    const existing = figma.currentPage.findOne(n => n.name === BUTTON_SET_NAME);
    if (existing) existing.remove();

    const font = await loadButtonFont();
    const components: ComponentNode[] = [];

    const b = (tokens as Record<string, unknown>).MSQDX_BUTTON as Record<string, unknown>;
    const sizeTok = b?.size as Record<string, { height: number; padding: { horizontal: number; vertical: number }; fontSize: string; gap: number }>;
    const radiusTok = b?.borderRadius as Record<string, number>;

    function createBaseComponent(): ComponentNode {
        const comp = figma.createComponent();
        comp.layoutMode = 'HORIZONTAL';
        comp.primaryAxisAlignItems = 'CENTER';
        comp.counterAxisAlignItems = 'CENTER';
        comp.primaryAxisSizingMode = 'AUTO';  // width = hug content
        comp.counterAxisSizingMode = 'FIXED';
        comp.resize(1, 29);  // min width 1, height set by binding

        const text = figma.createText();
        text.fontName = font;
        text.characters = 'Button';
        comp.appendChild(text);

        const labelPropId = comp.addComponentProperty('Label', 'TEXT', 'Button');
        comp.addComponentProperty('Disabled', 'BOOLEAN', false);
        comp.addComponentProperty('Loading', 'BOOLEAN', false);
        (text as TextNode).componentPropertyReferences = { characters: labelPropId };

        return comp;
    }

    function applyVariant(
        comp: ComponentNode,
        variant: Variant,
        color: BrandColor,
        size: Size,
        radius: Radius
    ) {
        comp.name = `Variant=${variant}, Color=${color}, Size=${size}, Radius=${radius}`;

        const sv = sizeVars[size]!;
        const rv = radiusVars[radius];
        const colorVar = colorVars[color];
        const textVar = color === 'Yellow' ? textOnBright! : textOnDark!;

        comp.setBoundVariable('height', sv.height);
        comp.setBoundVariable('paddingLeft', sv.paddingH);
        comp.setBoundVariable('paddingRight', sv.paddingH);
        comp.setBoundVariable('paddingTop', sv.paddingV);
        comp.setBoundVariable('paddingBottom', sv.paddingV);
        comp.setBoundVariable('itemSpacing', sv.gap);

        if (rv) {
            comp.setBoundVariable('topLeftRadius', rv);
            comp.setBoundVariable('topRightRadius', rv);
            comp.setBoundVariable('bottomLeftRadius', rv);
            comp.setBoundVariable('bottomRightRadius', rv);
        } else {
            const rk = radiusKey(radius);
            comp.cornerRadius = (radiusTok?.[rk] as number) ?? 999;
        }

        const text = comp.findOne(n => n.type === 'TEXT') as TextNode;
        if (text) {
            text.setBoundVariable('fontSize', sv.fontSize);
            text.fills = [
                figma.variables.setBoundVariableForPaint(
                    { type: 'SOLID', color: { r: 0, g: 0, b: 0 } },
                    'color',
                    textVar
                ),
            ];
        }

        if (variant === 'Contained') {
            comp.fills = [
                figma.variables.setBoundVariableForPaint(
                    { type: 'SOLID', color: { r: 0, g: 0, b: 0 } },
                    'color',
                    colorVar
                ),
            ];
            comp.strokes = [];
        } else if (variant === 'Outlined' || variant === 'Glass') {
            comp.fills = [];
            comp.strokes = [
                figma.variables.setBoundVariableForPaint(
                    { type: 'SOLID', color: { r: 0, g: 0, b: 0 } },
                    'color',
                    colorVar
                ),
            ];
            comp.strokeWeight = 1;
        } else {
            comp.fills = [];
            comp.strokes = [];
        }
    }

    const base = createBaseComponent();
    await figma.loadFontAsync(font);
    applyVariant(base, 'Contained', 'Green', 'Small', 'Default');
    base.x = 0;
    base.y = 0;
    figma.currentPage.appendChild(base);
    components.push(base);

    for (const variant of VARIANTS) {
        for (const color of COLORS) {
            for (const size of SIZES) {
                for (const radius of RADII) {
                    if (variant === 'Contained' && color === 'Green' && size === 'Small' && radius === 'Default') continue;

                    const clone = base.clone();
                    applyVariant(clone, variant, color, size, radius);
                    clone.x = 0;
                    clone.y = 0;
                    figma.currentPage.appendChild(clone);
                    components.push(clone);
                }
            }
        }
    }

    const componentSet = figma.combineAsVariants(components, figma.currentPage);
    componentSet.name = BUTTON_SET_NAME;

    figma.notify(`Button: ${components.length} variants created with variable bindings.`);
}

async function loadButtonFont(): Promise<FontName> {
    const preferred = { family: 'IBM Plex Mono', style: 'Regular' };
    try {
        await figma.loadFontAsync(preferred);
        return preferred;
    } catch {
        try {
            await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
            return { family: 'Inter', style: 'Regular' };
        } catch {
            const fonts = await figma.listAvailableFontsAsync();
            const fallback = fonts.find(f => f.fontName.family === 'Inter') ?? fonts[0];
            if (fallback) {
                await figma.loadFontAsync(fallback.fontName);
                return fallback.fontName;
            }
            throw new Error('No font available');
        }
    }
}
