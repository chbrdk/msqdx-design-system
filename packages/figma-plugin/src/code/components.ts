import { MsqdxComponent } from './schema';
import { hexToRgb } from './utils';

// Placeholder for components.json logic
// In reality we would import it like tokens.json or fetch it.
const components: MsqdxComponent[] = []; // Empty for now

export async function syncComponents() {
    console.log('Syncing components...');
    if (components.length === 0) {
        figma.notify('No components definition found (placeholder active).');

        // Create a demo component as proof of concept
        const demo: MsqdxComponent = {
            name: 'Demo Button',
            type: 'COMPONENT',
            width: 120,
            height: 48,
            fills: [{ color: '#00ca55' }],
            autoLayout: {
                direction: 'HORIZONTAL',
                padding: 16,
                gap: 8,
                alignItems: 'CENTER',
                justifyContent: 'CENTER'
            },
            children: [
                {
                    name: 'Label',
                    type: 'TEXT',
                    text: 'Click Me',
                    fontSize: 16,
                    fills: [{ color: '#ffffff' }]
                }
            ]
        };

        try {
            await createNode(demo, figma.currentPage);
            figma.notify('Created Demo Component!');
        } catch (e) {
            console.error(e);
            figma.notify('Error creating component: ' + e);
        }
        return;
    }

    const page = figma.currentPage;
    for (const comp of components) {
        await createNode(comp, page);
    }
}

async function createNode(def: MsqdxComponent, parent: BaseNode & ChildrenMixin) {
    let node: SceneNode;

    if (def.type === 'FRAME' || def.type === 'COMPONENT') {
        const frame = def.type === 'COMPONENT' ? figma.createComponent() : figma.createFrame();
        frame.name = def.name;
        if (def.width && def.height) frame.resize(def.width, def.height);

        // Fills
        if (def.fills) {
            frame.fills = def.fills.map(f => ({
                type: 'SOLID',
                color: hexToRgb(f.color)
            }));
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
        if (def.fills) {
            rect.fills = def.fills.map(f => ({
                type: 'SOLID',
                color: hexToRgb(f.color)
            }));
        }
        node = rect;
    }

    if (parent.type !== 'DOCUMENT') {
        parent.appendChild(node);
    }
    return node;
}
