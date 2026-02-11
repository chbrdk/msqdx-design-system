import { ATOM_DEFINITIONS } from './atoms';
import { MsqdxComponent } from './schema';
import { hexToRgb, parseColor } from './utils';

export async function syncComponents() {
    console.log('Syncing MSQDX atoms...');
    const page = figma.currentPage;

    try {
        for (const comp of ATOM_DEFINITIONS) {
            await createNode(comp, page);
        }
        figma.notify(`Created ${ATOM_DEFINITIONS.length} atom components`);
    } catch (e) {
        console.error(e);
        figma.notify('Error creating components: ' + (e instanceof Error ? e.message : String(e)));
    }
}

async function createNode(def: MsqdxComponent, parent: BaseNode & ChildrenMixin) {
    let node: SceneNode;

    if (def.type === 'FRAME' || def.type === 'COMPONENT') {
        const frame = def.type === 'COMPONENT' ? figma.createComponent() : figma.createFrame();
        frame.name = def.name;
        if (def.width && def.height) frame.resize(def.width, def.height);
        if (def.cornerRadius !== undefined) frame.cornerRadius = def.cornerRadius;

        // Fills
        if (def.fills) {
            frame.fills = def.fills.map(f => {
                const c = parseColor(f.color) ?? hexToRgb(f.color);
                return { type: 'SOLID' as const, color: c, opacity: f.opacity ?? c.a ?? 1 };
            });
        }
        if (def.strokes) {
            frame.strokes = def.strokes.map(s => {
                const c = parseColor(s.color) ?? hexToRgb(s.color);
                return { type: 'SOLID' as const, color: c };
            });
            frame.strokeWeight = def.strokes[0]?.weight ?? 1;
        }

        // AutoLayout
        if (def.autoLayout) {
            frame.layoutMode = def.autoLayout.direction;
            const p = def.autoLayout.padding;
            if (typeof p === 'number') {
                frame.paddingLeft = frame.paddingRight = frame.paddingTop = frame.paddingBottom = p;
            } else if (p) {
                frame.paddingTop = p.top;
                frame.paddingBottom = p.bottom;
                frame.paddingLeft = p.left;
                frame.paddingRight = p.right;
            }
            if (def.autoLayout.gap) frame.itemSpacing = def.autoLayout.gap;

            if (def.autoLayout.justifyContent === 'CENTER') frame.primaryAxisAlignItems = 'CENTER';
            if (def.autoLayout.justifyContent === 'MAX') frame.primaryAxisAlignItems = 'MAX';
            if (def.autoLayout.justifyContent === 'SPACE_BETWEEN') frame.primaryAxisAlignItems = 'SPACE_BETWEEN';

            if (def.autoLayout.alignItems === 'CENTER') frame.counterAxisAlignItems = 'CENTER';
            if (def.autoLayout.alignItems === 'MAX') frame.counterAxisAlignItems = 'MAX';
        }

        // Children
        if (def.children) {
            for (const child of def.children) {
                await createNode(child, frame);
            }
        }
        node = frame;
    } else if (def.type === 'TEXT') {
        const text = figma.createText();
        // Try to load basic font, fallback might be needed
        await figma.loadFontAsync({ family: "Inter", style: "Regular" }).catch(() => {
            return figma.loadFontAsync({ family: "Roboto", style: "Regular" });
        });

        text.characters = def.text || '';
        if (def.fontSize) text.fontSize = def.fontSize;
        if (def.fills) {
            text.fills = def.fills.map(f => ({
                type: 'SOLID',
                color: hexToRgb(f.color)
            }));
        }
        node = text;
    } else {
        const rect = figma.createRectangle();
        if (def.width && def.height) rect.resize(def.width, def.height);
        if (def.cornerRadius !== undefined) rect.cornerRadius = def.cornerRadius;
        if (def.fills) {
            rect.fills = def.fills.map(f => {
                const c = parseColor(f.color) ?? hexToRgb(f.color);
                return { type: 'SOLID' as const, color: c, opacity: f.opacity ?? c.a ?? 1 };
            });
        }
        if (def.strokes) {
            rect.strokes = def.strokes.map(s => {
                const c = parseColor(s.color) ?? hexToRgb(s.color);
                return { type: 'SOLID' as const, color: c };
            });
            rect.strokeWeight = def.strokes[0]?.weight ?? 1;
        }
        node = rect;
    }

    if (parent.type !== 'DOCUMENT') {
        parent.appendChild(node);
    }
    return node;
}
