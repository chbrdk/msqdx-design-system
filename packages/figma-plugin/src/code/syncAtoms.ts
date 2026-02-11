/**
 * Atom sync: combineAsVariants + variable bindings for all MSQDX atoms.
 * Same pattern as syncButton. Requires Sync Design Tokens first.
 */
// @ts-ignore
import tokens from '../../../tokens/dist/tokens.json';
import { syncButton } from './syncButton';

const COLLECTION_NAME = 'MSQDX Design Tokens';

const BRAND_COLORS = ['Purple', 'Yellow', 'Pink', 'Orange', 'Green'] as const;
type BrandColor = (typeof BRAND_COLORS)[number];
const COLOR_VARS: Record<BrandColor, string> = {
    Purple: 'colors/brand/purple',
    Yellow: 'colors/brand/yellow',
    Pink: 'colors/brand/pink',
    Orange: 'colors/brand/orange',
    Green: 'colors/brand/green',
};

async function getVarCollection() {
    const collections = await figma.variables.getLocalVariableCollectionsAsync();
    return collections.find(c => c.name === COLLECTION_NAME);
}

function buildVarMap(collection: VariableCollection) {
    const allVars = figma.variables.getLocalVariablesAsync();
    return allVars.then(vars => {
        const m = new Map<string, Variable>();
        for (const v of vars) {
            if (v.variableCollectionId === collection.id) m.set(v.name, v);
        }
        return m;
    });
}

async function loadFont(): Promise<FontName> {
    try {
        await figma.loadFontAsync({ family: 'IBM Plex Mono', style: 'Regular' });
        return { family: 'IBM Plex Mono', style: 'Regular' };
    } catch {
        try {
            await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
            return { family: 'Inter', style: 'Regular' };
        } catch {
            const fonts = await figma.listAvailableFontsAsync();
            const f = fonts.find(x => x.fontName.family === 'Inter') ?? fonts[0];
            if (f) {
                await figma.loadFontAsync(f.fontName);
                return f.fontName;
            }
            throw new Error('No font');
        }
    }
}

function removeExisting(name: string) {
    const n = figma.currentPage.findOne(x => x.name === name);
    if (n) n.remove();
}

/** Divider: Orientation × Thickness × Color */
export async function syncDivider() {
    const collection = await getVarCollection();
    if (!collection) {
        figma.notify('Run Sync Design Tokens first.');
        return;
    }
    const varMap = await buildVarMap(collection);

    const getVar = (n: string) => varMap.get(n);
    const colorVars: Record<BrandColor, Variable> = {} as any;
    for (const c of BRAND_COLORS) {
        const v = getVar(COLOR_VARS[c]);
        if (!v) {
            figma.notify(`Variable ${COLOR_VARS[c]} missing.`);
            return;
        }
        colorVars[c] = v;
    }
    const neutral = getVar('colors/300') ?? getVar('colors/NEUTRAL/300');
    if (!neutral) {
        figma.notify('Variable colors/NEUTRAL/300 missing.');
        return;
    }

    const borderVars = {
        Thin: getVar('numbers/EFFECTS/borderWidth/thin'),
        Medium: getVar('numbers/EFFECTS/borderWidth/medium'),
        Thick: getVar('numbers/EFFECTS/borderWidth/thick'),
    };

    removeExisting('MSQDX/Divider');
    const font = await loadFont();

    const orient: ('Horizontal' | 'Vertical')[] = ['Horizontal', 'Vertical'];
    const thickness: ('Thin' | 'Medium' | 'Thick')[] = ['Thin', 'Medium', 'Thick'];
    const colors: (BrandColor | 'Default')[] = ['Default', ...BRAND_COLORS];

    const components: ComponentNode[] = [];
    const base = figma.createComponent();
    base.layoutMode = 'HORIZONTAL';
    base.primaryAxisSizingMode = 'AUTO';
    base.counterAxisSizingMode = 'FIXED';
    base.resize(200, 1);
    base.fills = [];
    base.strokes = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', neutral)];
    base.strokeWeight = 1;
    if (borderVars.Thin) base.setBoundVariable('strokeWeight', borderVars.Thin);
    base.name = 'Orientation=Horizontal, Thickness=Thin, Color=Default';
    figma.currentPage.appendChild(base);
    components.push(base);

    for (const o of orient) {
        for (const t of thickness) {
            for (const col of colors) {
                if (o === 'Horizontal' && t === 'Thin' && col === 'Default') continue;
                const c = base.clone();
                c.name = `Orientation=${o}, Thickness=${t}, Color=${col}`;
                c.layoutMode = o === 'Horizontal' ? 'HORIZONTAL' : 'VERTICAL';
                const strokeVar = col === 'Default' ? neutral : colorVars[col as BrandColor];
                c.strokes = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', strokeVar)];
                const bw = t === 'Thin' ? borderVars.Thin : t === 'Medium' ? borderVars.Medium : borderVars.Thick;
                if (bw) c.setBoundVariable('strokeWeight', bw);
                c.resize(o === 'Horizontal' ? 200 : 1, o === 'Horizontal' ? 1 : 200);
                figma.currentPage.appendChild(c);
                components.push(c);
            }
        }
    }

    const set = figma.combineAsVariants(components, figma.currentPage);
    set.name = 'MSQDX/Divider';
    figma.notify(`Divider: ${components.length} variants created.`);
}

/** Badge: Size × Color */
export async function syncBadge() {
    const collection = await getVarCollection();
    if (!collection) {
        figma.notify('Run Sync Design Tokens first.');
        return;
    }
    const varMap = await buildVarMap(collection);
    const getVar = (n: string) => varMap.get(n);

    const colorVars: Record<BrandColor, Variable> = {} as any;
    for (const c of BRAND_COLORS) {
        const v = getVar(COLOR_VARS[c]);
        if (!v) {
            figma.notify(`Variable ${COLOR_VARS[c]} missing.`);
            return;
        }
        colorVars[c] = v;
    }
    const textVar = getVar('colors/brand/black');
    if (!textVar) {
        figma.notify('Variable colors/brand/black missing.');
        return;
    }

    const sizes: ('Small' | 'Medium' | 'Large')[] = ['Small', 'Medium', 'Large'];
    const sk = (s: string) => s.toLowerCase() as 'small' | 'medium' | 'large';
    const padH = (s: string) => getVar(`numbers/BADGE/size/${sk(s)}/padding/horizontal`);
    const padV = (s: string) => getVar(`numbers/BADGE/size/${sk(s)}/padding/vertical`);
    const labelFs = (s: string) => getVar(`numbers/BADGE/size/${sk(s)}/labelFontSize`);

    removeExisting('MSQDX/Badge');
    const font = await loadFont();

    const base = figma.createComponent();
    base.layoutMode = 'VERTICAL';
    base.primaryAxisSizingMode = 'AUTO';
    base.counterAxisSizingMode = 'AUTO';
    base.primaryAxisAlignItems = 'CENTER';
    base.counterAxisAlignItems = 'CENTER';
    base.cornerRadius = 6;
    const tintGreen = getVar('colors/tints/green') ?? colorVars.Green;
    base.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0.8, b: 0.33 } }, 'color', tintGreen)];
    base.strokes = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0.8, b: 0.33 } }, 'color', colorVars.Green)];
    base.strokeWeight = 2;

    const text = figma.createText();
    text.fontName = font;
    text.characters = '42';
    text.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', textVar)];
    base.appendChild(text);

    const labelProp = base.addComponentProperty('Label', 'TEXT', '42');
    (text as TextNode).componentPropertyReferences = { characters: labelProp };

    base.name = 'Size=Small, Color=Green';
    const ph = padH('Small');
    const pv = padV('Small');
    const lfs = labelFs('Small');
    if (ph) base.setBoundVariable('paddingLeft', ph);
    if (ph) base.setBoundVariable('paddingRight', ph);
    if (pv) base.setBoundVariable('paddingTop', pv);
    if (pv) base.setBoundVariable('paddingBottom', pv);
    if (lfs) text.setBoundVariable('fontSize', lfs);

    figma.currentPage.appendChild(base);
    const components: ComponentNode[] = [base];

    for (const size of sizes) {
        for (const col of BRAND_COLORS) {
            if (size === 'Small' && col === 'Green') continue;
            const c = base.clone();
            c.name = `Size=${size}, Color=${col}`;
            const tint = getVar(`colors/tints/${col.toLowerCase()}`) ?? colorVars[col];
            c.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', tint)];
            c.strokes = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', colorVars[col])];
            const t = c.findOne(n => n.type === 'TEXT') as TextNode;
            if (t) {
                if (padH(size)) c.setBoundVariable('paddingLeft', padH(size)!);
                if (padH(size)) c.setBoundVariable('paddingRight', padH(size)!);
                if (padV(size)) c.setBoundVariable('paddingTop', padV(size)!);
                if (padV(size)) c.setBoundVariable('paddingBottom', padV(size)!);
                if (labelFs(size)) t.setBoundVariable('fontSize', labelFs(size)!);
            }
            figma.currentPage.appendChild(c);
            components.push(c);
        }
    }

    const set = figma.combineAsVariants(components, figma.currentPage);
    set.name = 'MSQDX/Badge';
    figma.notify(`Badge: ${components.length} variants created.`);
}

/** Chip: Variant × Size × Color */
export async function syncChip() {
    const collection = await getVarCollection();
    if (!collection) {
        figma.notify('Run Sync Design Tokens first.');
        return;
    }
    const varMap = await buildVarMap(collection);
    const getVar = (n: string) => varMap.get(n);

    const colorVars: Record<BrandColor, Variable> = {} as any;
    for (const c of BRAND_COLORS) {
        const v = getVar(COLOR_VARS[c]);
        if (!v) {
            figma.notify(`Variable ${COLOR_VARS[c]} missing.`);
            return;
        }
        colorVars[c] = v;
    }
    const textVar = getVar('colors/brand/black');
    if (!textVar) {
        figma.notify('Variable colors/brand/black missing.');
        return;
    }

    const variants: ('Glass' | 'Filled' | 'Outlined')[] = ['Glass', 'Filled', 'Outlined'];
    const sizes: ('Small' | 'Medium' | 'Large')[] = ['Small', 'Medium', 'Large'];
    const sk = (s: string) => s.toLowerCase() as 'small' | 'medium' | 'large';

    removeExisting('MSQDX/Chip');
    const font = await loadFont();

    const base = figma.createComponent();
    base.layoutMode = 'HORIZONTAL';
    base.primaryAxisSizingMode = 'AUTO';
    base.counterAxisSizingMode = 'FIXED';
    base.primaryAxisAlignItems = 'CENTER';
    base.counterAxisAlignItems = 'CENTER';
    base.cornerRadius = 8;
    base.resize(1, 28);

    const heightVar = getVar('numbers/CHIP/size/medium/height');
    const padH = getVar('numbers/CHIP/size/medium/padding/horizontal');
    const padV = getVar('numbers/CHIP/size/medium/padding/vertical');
    const gapVar = getVar('numbers/CHIP/size/medium/gap');
    const fsVar = getVar('numbers/CHIP/size/medium/fontSize');

    if (heightVar) base.setBoundVariable('height', heightVar);
    if (padH) base.setBoundVariable('paddingLeft', padH);
    if (padH) base.setBoundVariable('paddingRight', padH);
    if (padV) base.setBoundVariable('paddingTop', padV);
    if (padV) base.setBoundVariable('paddingBottom', padV);
    if (gapVar) base.setBoundVariable('itemSpacing', gapVar);

    const text = figma.createText();
    text.fontName = font;
    text.characters = 'Tag';
    text.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', textVar)];
    if (fsVar) text.setBoundVariable('fontSize', fsVar);
    base.appendChild(text);

    base.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0.8, b: 0.33 } }, 'color', colorVars.Green)];
    base.strokes = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0.8, b: 0.33 } }, 'color', colorVars.Green)];
    base.strokeWeight = 1;

    const labelProp = base.addComponentProperty('Label', 'TEXT', 'Tag');
    (text as TextNode).componentPropertyReferences = { characters: labelProp };

    base.name = 'Variant=Glass, Size=Medium, Color=Green';
    figma.currentPage.appendChild(base);
    const components: ComponentNode[] = [base];

    for (const v of variants) {
        for (const s of sizes) {
            for (const col of BRAND_COLORS) {
                if (v === 'Glass' && s === 'Medium' && col === 'Green') continue;
                const c = base.clone();
                c.name = `Variant=${v}, Size=${s}, Color=${col}`;

                const h = getVar(`numbers/CHIP/size/${sk(s)}/height`);
                const ph = getVar(`numbers/CHIP/size/${sk(s)}/padding/horizontal`);
                const pv = getVar(`numbers/CHIP/size/${sk(s)}/padding/vertical`);
                const gap = getVar(`numbers/CHIP/size/${sk(s)}/gap`);
                const fs = getVar(`numbers/CHIP/size/${sk(s)}/fontSize`);
                const txt = c.findOne(n => n.type === 'TEXT') as TextNode;

                if (h) c.setBoundVariable('height', h);
                if (ph) c.setBoundVariable('paddingLeft', ph);
                if (ph) c.setBoundVariable('paddingRight', ph);
                if (pv) c.setBoundVariable('paddingTop', pv);
                if (pv) c.setBoundVariable('paddingBottom', pv);
                if (gap) c.setBoundVariable('itemSpacing', gap);
                if (fs && txt) txt.setBoundVariable('fontSize', fs);

                if (v === 'Filled') {
                    c.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', colorVars[col])];
                    c.strokes = [];
                    (txt as TextNode).fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }, 'color', getVar('colors/brand/white')!)];
                } else if (v === 'Outlined') {
                    c.fills = [];
                    c.strokes = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', colorVars[col])];
                } else {
                    const tint = getVar(`colors/tints/${col.toLowerCase()}`);
                    const fillColor = tint ?? colorVars[col];
                    c.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', fillColor)];
                    c.strokes = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', colorVars[col])];
                }
                figma.currentPage.appendChild(c);
                components.push(c);
            }
        }
    }

    const set = figma.combineAsVariants(components, figma.currentPage);
    set.name = 'MSQDX/Chip';
    figma.notify(`Chip: ${components.length} variants created.`);
}

/** Typography: Variant (H1–H6, Body1, Body2) */
export async function syncTypography() {
    const collection = await getVarCollection();
    if (!collection) {
        figma.notify('Run Sync Design Tokens first.');
        return;
    }
    const varMap = await buildVarMap(collection);
    const getVar = (n: string) => varMap.get(n);
    const textVar = getVar('colors/light/textPrimary') ?? getVar('colors/brand/black');
    if (!textVar) {
        figma.notify('Variable for text color missing.');
        return;
    }

    const variants = [
        { name: 'H1', sample: 'Heading 1', fsVar: 'numbers/TYPOGRAPHY/fontSize/4xl' },
        { name: 'H2', sample: 'Heading 2', fsVar: 'numbers/TYPOGRAPHY/fontSize/3xl' },
        { name: 'H3', sample: 'Heading 3', fsVar: 'numbers/TYPOGRAPHY/fontSize/2xl' },
        { name: 'Body1', sample: 'Body text', fsVar: 'numbers/TYPOGRAPHY/fontSize/base' },
        { name: 'Body2', sample: 'Caption', fsVar: 'numbers/TYPOGRAPHY/fontSize/sm' },
    ];

    removeExisting('MSQDX/Typography');
    const font = await loadFont();

    const components: ComponentNode[] = [];
    for (const v of variants) {
        const comp = figma.createComponent();
        comp.layoutMode = 'VERTICAL';
        comp.primaryAxisSizingMode = 'AUTO';
        comp.counterAxisSizingMode = 'AUTO';
        comp.resize(1, 1);

        const text = figma.createText();
        text.fontName = font;
        text.characters = v.sample;
        text.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', textVar)];
        const fs = getVar(v.fsVar);
        if (fs) text.setBoundVariable('fontSize', fs);
        comp.appendChild(text);

        const prop = comp.addComponentProperty('Text', 'TEXT', v.sample);
        (text as TextNode).componentPropertyReferences = { characters: prop };

        comp.name = `Variant=${v.name}`;
        figma.currentPage.appendChild(comp);
        components.push(comp);
    }

    const set = figma.combineAsVariants(components, figma.currentPage);
    set.name = 'MSQDX/Typography';
    figma.notify(`Typography: ${components.length} variants created.`);
}

/** Avatar: Size × Variant × Color */
export async function syncAvatar() {
    const collection = await getVarCollection();
    if (!collection) {
        figma.notify('Run Sync Design Tokens first.');
        return;
    }
    const varMap = await buildVarMap(collection);
    const getVar = (n: string) => varMap.get(n);

    const colorVars: Record<BrandColor, Variable> = {} as any;
    for (const c of BRAND_COLORS) {
        const v = getVar(`colors/fallbackBackground/${c.toLowerCase()}`) ?? getVar(COLOR_VARS[c]);
        if (v) colorVars[c] = v;
    }
    const textVar = getVar('colors/brand/black');
    if (!textVar) {
        figma.notify('Variable colors/brand/black missing.');
        return;
    }

    const sizes: ('Xs' | 'Sm' | 'Md' | 'Lg' | 'Xl')[] = ['Xs', 'Sm', 'Md', 'Lg', 'Xl'];
    const shapes: ('Circle' | 'Rounded' | 'Square')[] = ['Circle', 'Rounded', 'Square'];

    removeExisting('MSQDX/Avatar');
    const font = await loadFont();

    const base = figma.createComponent();
    base.layoutMode = 'HORIZONTAL';
    base.primaryAxisSizingMode = 'FIXED';
    base.counterAxisSizingMode = 'FIXED';
    base.primaryAxisAlignItems = 'CENTER';
    base.counterAxisAlignItems = 'CENTER';
    base.resize(40, 40);
    base.cornerRadius = 20;

    const wVar = getVar('numbers/AVATAR/size/md/width');
    const hVar = getVar('numbers/AVATAR/size/md/height');
    const fsVar = getVar('numbers/AVATAR/size/md/fontSize');
    if (wVar) base.setBoundVariable('width', wVar);
    if (hVar) base.setBoundVariable('height', hVar);

    base.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0.71, g: 0.22, b: 1 } }, 'color', colorVars.Purple)];

    const text = figma.createText();
    text.fontName = font;
    text.characters = 'JD';
    text.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', textVar)];
    if (fsVar) text.setBoundVariable('fontSize', fsVar);
    base.appendChild(text);

    const prop = base.addComponentProperty('Initials', 'TEXT', 'JD');
    (text as TextNode).componentPropertyReferences = { characters: prop };

    base.name = 'Size=Md, Shape=Circle, Color=Purple';
    figma.currentPage.appendChild(base);
    const components: ComponentNode[] = [base];

    const sk: Record<string, string> = { Xs: 'xs', Sm: 'sm', Md: 'md', Lg: 'lg', Xl: 'xl' };
    for (const size of sizes) {
        for (const shape of shapes) {
            for (const col of BRAND_COLORS) {
                if (size === 'Md' && shape === 'Circle' && col === 'Purple') continue;
                const c = base.clone();
                c.name = `Size=${size}, Shape=${shape}, Color=${col}`;

                const w = getVar(`numbers/AVATAR/size/${sk[size]}/width`);
                const h = getVar(`numbers/AVATAR/size/${sk[size]}/height`);
                const fs = getVar(`numbers/AVATAR/size/${sk[size]}/fontSize`);
                const txt = c.findOne(n => n.type === 'TEXT') as TextNode;
                if (w) c.setBoundVariable('width', w);
                if (h) c.setBoundVariable('height', h);
                if (fs && txt) txt.setBoundVariable('fontSize', fs);

                c.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', colorVars[col])];
                c.cornerRadius = shape === 'Circle' ? 999 : shape === 'Rounded' ? 20 : 0;

                figma.currentPage.appendChild(c);
                components.push(c);
            }
        }
    }

    const set = figma.combineAsVariants(components, figma.currentPage);
    set.name = 'MSQDX/Avatar';
    figma.notify(`Avatar: ${components.length} variants created.`);
}

/** Progress: Color */
export async function syncProgress() {
    const collection = await getVarCollection();
    if (!collection) {
        figma.notify('Run Sync Design Tokens first.');
        return;
    }
    const varMap = await buildVarMap(collection);
    const getVar = (n: string) => varMap.get(n);

    const colorVars: Record<string, Variable> = {};
    for (const c of ['green', 'yellow', 'orange', 'pink', 'purple']) {
        const v = getVar(`colors/brand/${c}`);
        if (v) colorVars[c] = v;
    }
    const trackVar = getVar('colors/300');
    if (!trackVar) {
        figma.notify('Variable for progress track missing.');
        return;
    }

    removeExisting('MSQDX/Progress');
    const colors = ['Green', 'Yellow', 'Orange', 'Pink', 'Purple'] as const;

    const base = figma.createComponent();
    base.layoutMode = 'HORIZONTAL';
    base.primaryAxisSizingMode = 'FIXED';
    base.counterAxisSizingMode = 'FIXED';
    base.resize(200, 6);
    base.cornerRadius = 3;
    base.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0.83, g: 0.83, b: 0.83 } }, 'color', trackVar)];

    const bar = figma.createRectangle();
    bar.resize(120, 6);
    bar.cornerRadius = 3;
    bar.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0.8, b: 0.33 } }, 'color', colorVars.green!)];
    base.appendChild(bar);

    base.addComponentProperty('Value', 'TEXT', '60');
    base.name = 'Color=Green';
    figma.currentPage.appendChild(base);
    const components: ComponentNode[] = [base];

    for (const col of colors) {
        if (col === 'Green') continue;
        const c = base.clone();
        c.name = `Color=${col}`;
        const cv = colorVars[col.toLowerCase()];
        if (cv) {
            const b = c.findOne(n => n.type === 'RECTANGLE') as RectangleNode;
            if (b) b.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', cv)];
        }
        figma.currentPage.appendChild(c);
        components.push(c);
    }

    const set = figma.combineAsVariants(components, figma.currentPage);
    set.name = 'MSQDX/Progress';
    figma.notify(`Progress: ${components.length} variants created.`);
}

/** Card: Variant × Color */
export async function syncCard() {
    const collection = await getVarCollection();
    if (!collection) {
        figma.notify('Run Sync Design Tokens first.');
        return;
    }
    const varMap = await buildVarMap(collection);
    const getVar = (n: string) => varMap.get(n);

    const colorVars: Record<BrandColor, Variable> = {} as any;
    for (const c of BRAND_COLORS) {
        const v = getVar(COLOR_VARS[c]);
        if (v) colorVars[c] = v;
    }
    const borderVar = getVar('colors/light/border') ?? getVar('colors/300');
    const bgVar = getVar('colors/light/paper') ?? getVar('colors/brand/white');
    const textVar = getVar('colors/brand/black');
    if (!borderVar || !bgVar || !textVar) {
        figma.notify('Card variables missing.');
        return;
    }

    removeExisting('MSQDX/Card');
    const font = await loadFont();

    const variants: ('Flat' | 'Glass' | 'Elevated')[] = ['Flat', 'Glass', 'Elevated'];
    const colors: (BrandColor | 'Default')[] = ['Default', ...BRAND_COLORS];

    const base = figma.createComponent();
    base.layoutMode = 'VERTICAL';
    base.primaryAxisSizingMode = 'FIXED';
    base.counterAxisSizingMode = 'FIXED';
    base.primaryAxisAlignItems = 'MIN';
    base.counterAxisAlignItems = 'MIN';
    base.resize(280, 160);
    base.cornerRadius = 32;
    base.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }, 'color', bgVar)];
    base.strokes = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0.83, g: 0.83, b: 0.83 } }, 'color', borderVar)];
    base.strokeWeight = 1;

    const padVar = getVar('numbers/SPACING/scale/md');
    if (padVar) {
        base.setBoundVariable('paddingLeft', padVar);
        base.setBoundVariable('paddingRight', padVar);
        base.setBoundVariable('paddingTop', padVar);
        base.setBoundVariable('paddingBottom', padVar);
    } else {
        base.paddingLeft = base.paddingRight = base.paddingTop = base.paddingBottom = 16;
    }

    const title = figma.createText();
    title.fontName = font;
    title.characters = 'Card Title';
    title.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', textVar)];
    title.fontSize = 18;
    base.appendChild(title);

    const body = figma.createText();
    body.fontName = font;
    body.characters = 'Card content goes here.';
    body.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', textVar)];
    body.fontSize = 14;
    base.appendChild(body);

    const headlineProp = base.addComponentProperty('Headline', 'TEXT', 'Card Title');
    const bodyProp = base.addComponentProperty('Body', 'TEXT', 'Card content goes here.');
    (title as TextNode).componentPropertyReferences = { characters: headlineProp };
    (body as TextNode).componentPropertyReferences = { characters: bodyProp };

    base.name = 'Variant=Flat, Color=Default';
    figma.currentPage.appendChild(base);
    const components: ComponentNode[] = [base];

    for (const v of variants) {
        for (const col of colors) {
            if (v === 'Flat' && col === 'Default') continue;
            const c = base.clone();
            c.name = `Variant=${v}, Color=${col}`;
            if (col !== 'Default' && colorVars[col as BrandColor]) {
                c.strokes = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', colorVars[col as BrandColor])];
            }
            figma.currentPage.appendChild(c);
            components.push(c);
        }
    }

    const set = figma.combineAsVariants(components, figma.currentPage);
    set.name = 'MSQDX/Card';
    figma.notify(`Card: ${components.length} variants created.`);
}

/** Label: Size */
export async function syncLabel() {
    const collection = await getVarCollection();
    if (!collection) {
        figma.notify('Run Sync Design Tokens first.');
        return;
    }
    const varMap = await buildVarMap(collection);
    const getVar = (n: string) => varMap.get(n);
    const textVar = getVar('colors/brand/black');
    if (!textVar) {
        figma.notify('Variable colors/brand/black missing.');
        return;
    }

    removeExisting('MSQDX/Label');
    const font = await loadFont();

    const sizes: ('Small' | 'Medium' | 'Large')[] = ['Small', 'Medium', 'Large'];
    const fsVars = ['numbers/TYPOGRAPHY/fontSize/xs', 'numbers/TYPOGRAPHY/fontSize/xs', 'numbers/TYPOGRAPHY/fontSize/sm'];

    const components: ComponentNode[] = [];
    for (let i = 0; i < sizes.length; i++) {
        const comp = figma.createComponent();
        comp.layoutMode = 'VERTICAL';
        comp.primaryAxisSizingMode = 'AUTO';
        comp.counterAxisSizingMode = 'AUTO';
        comp.resize(1, 1);

        const text = figma.createText();
        text.fontName = font;
        text.characters = 'LABEL';
        text.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', textVar)];
        const fs = getVar(fsVars[i]);
        if (fs) text.setBoundVariable('fontSize', fs);
        comp.appendChild(text);

        const prop = comp.addComponentProperty('Text', 'TEXT', 'LABEL');
        (text as TextNode).componentPropertyReferences = { characters: prop };

        comp.name = `Size=${sizes[i]}`;
        figma.currentPage.appendChild(comp);
        components.push(comp);
    }

    const set = figma.combineAsVariants(components, figma.currentPage);
    set.name = 'MSQDX/Label';
    figma.notify(`Label: ${components.length} variants created.`);
}

/** Input: Size */
export async function syncInput() {
    const collection = await getVarCollection();
    if (!collection) {
        figma.notify('Run Sync Design Tokens first.');
        return;
    }
    const varMap = await buildVarMap(collection);
    const getVar = (n: string) => varMap.get(n);
    const borderVar = getVar('colors/300');
    const bgVar = getVar('colors/brand/white');
    const placeholderVar = getVar('colors/400');
    if (!borderVar || !bgVar) {
        figma.notify('Input variables missing.');
        return;
    }

    removeExisting('MSQDX/Input');
    const font = await loadFont();

    const sizes: ('Small' | 'Medium' | 'Large')[] = ['Small', 'Medium', 'Large'];
    const sk = (s: string) => s.toLowerCase() as 'small' | 'medium' | 'large';

    const base = figma.createComponent();
    base.layoutMode = 'HORIZONTAL';
    base.primaryAxisSizingMode = 'AUTO';
    base.counterAxisSizingMode = 'FIXED';
    base.primaryAxisAlignItems = 'CENTER';
    base.counterAxisAlignItems = 'CENTER';
    base.resize(200, 36);
    base.cornerRadius = 20;
    base.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }, 'color', bgVar)];
    base.strokes = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0.83, g: 0.83, b: 0.83 } }, 'color', borderVar)];
    base.strokeWeight = 1;

    const hVar = getVar('numbers/INPUT/size/medium/height');
    const padH = getVar('numbers/INPUT/size/medium/padding/horizontal');
    const padV = getVar('numbers/INPUT/size/medium/padding/vertical');
    if (hVar) base.setBoundVariable('height', hVar);
    if (padH) base.setBoundVariable('paddingLeft', padH);
    if (padH) base.setBoundVariable('paddingRight', padH);
    if (padV) base.setBoundVariable('paddingTop', padV);
    if (padV) base.setBoundVariable('paddingBottom', padV);

    const text = figma.createText();
    text.fontName = font;
    text.characters = 'Placeholder';
    text.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0.64, g: 0.64, b: 0.64 } }, 'color', placeholderVar ?? borderVar)];
    text.fontSize = 12;
    base.appendChild(text);

    const prop = base.addComponentProperty('Placeholder', 'TEXT', 'Placeholder');
    (text as TextNode).componentPropertyReferences = { characters: prop };

    base.name = 'Size=Medium';
    figma.currentPage.appendChild(base);
    const components: ComponentNode[] = [base];

    for (const s of sizes) {
        if (s === 'Medium') continue;
        const c = base.clone();
        c.name = `Size=${s}`;
        const h = getVar(`numbers/INPUT/size/${sk(s)}/height`);
        const ph = getVar(`numbers/INPUT/size/${sk(s)}/padding/horizontal`);
        const pv = getVar(`numbers/INPUT/size/${sk(s)}/padding/vertical`);
        if (h) c.setBoundVariable('height', h);
        if (ph) c.setBoundVariable('paddingLeft', ph);
        if (ph) c.setBoundVariable('paddingRight', ph);
        if (pv) c.setBoundVariable('paddingTop', pv);
        if (pv) c.setBoundVariable('paddingBottom', pv);
        figma.currentPage.appendChild(c);
        components.push(c);
    }

    const set = figma.combineAsVariants(components, figma.currentPage);
    set.name = 'MSQDX/Input';
    figma.notify(`Input: ${components.length} variants created.`);
}

/** AspectRatio: Ratio (16:9, 4:3, 1:1) */
export async function syncAspectRatio() {
    const collection = await getVarCollection();
    if (!collection) {
        figma.notify('Run Sync Design Tokens first.');
        return;
    }
    const varMap = await buildVarMap(collection);
    const getVar = (n: string) => varMap.get(n);
    const fillVar = getVar('colors/300');
    const textVar = getVar('colors/brand/black');
    if (!fillVar) {
        figma.notify('AspectRatio variables missing.');
        return;
    }

    removeExisting('MSQDX/AspectRatio');
    const font = await loadFont();

    const ratios: { name: string; w: number; h: number }[] = [
        { name: '16:9', w: 320, h: 180 },
        { name: '4:3', w: 320, h: 240 },
        { name: '1:1', w: 200, h: 200 },
    ];

    const components: ComponentNode[] = [];
    for (const r of ratios) {
        const comp = figma.createComponent();
        comp.layoutMode = 'VERTICAL';
        comp.primaryAxisSizingMode = 'FIXED';
        comp.counterAxisSizingMode = 'FIXED';
        comp.primaryAxisAlignItems = 'CENTER';
        comp.counterAxisAlignItems = 'CENTER';
        comp.resize(r.w, r.h);
        comp.cornerRadius = 8;
        comp.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }, 'color', fillVar)];

        const text = figma.createText();
        text.fontName = font;
        text.characters = r.name;
        if (textVar) text.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', textVar)];
        else text.fills = [{ type: 'SOLID', color: { r: 0.2, g: 0.2, b: 0.2 } }];
        text.fontSize = 14;
        comp.appendChild(text);

        comp.addComponentProperty('Ratio', 'TEXT', r.name);
        comp.name = `Ratio=${r.name}`;
        figma.currentPage.appendChild(comp);
        components.push(comp);
    }

    const set = figma.combineAsVariants(components, figma.currentPage);
    set.name = 'MSQDX/AspectRatio';
    figma.notify(`AspectRatio: ${components.length} variants created.`);
}

export async function syncAllAtoms() {
    await syncButton();
    await syncDivider();
    await syncBadge();
    await syncChip();
    await syncTypography();
    await syncAvatar();
    await syncProgress();
    await syncCard();
    await syncLabel();
    await syncInput();
    await syncAspectRatio();
    figma.notify('All atoms synced.');
}
