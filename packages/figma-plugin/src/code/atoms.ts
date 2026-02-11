/**
 * MSQDX Design System – Atom definitions for Figma sync.
 * Values aligned with packages/tokens.
 */
import type { MsqdxComponent } from './schema';

// Token values (from MSQDX tokens)
const C = {
    green: '#00ca55',
    purple: '#b638ff',
    yellow: '#fef14d',
    pink: '#f256b6',
    orange: '#ff6a3b',
    white: '#ffffff',
    black: '#000000',
    neutral300: '#d4d4d4',
    neutralLight: 'rgba(0, 0, 0, 0.05)',
    tintGreen: 'rgba(0, 202, 85, 0.1)',
    tintPurple: 'rgba(182, 56, 255, 0.15)',
};

export const ATOM_DEFINITIONS: MsqdxComponent[] = [
    // Button (contained, green, small)
    {
        name: 'Atom/Button',
        type: 'COMPONENT',
        width: 120,
        height: 29,
        cornerRadius: 999,
        fills: [{ color: C.green }],
        autoLayout: {
            direction: 'HORIZONTAL',
            padding: 7,
            gap: 7,
            alignItems: 'CENTER',
            justifyContent: 'CENTER',
        },
        children: [
            { name: 'Label', type: 'TEXT', text: 'Button', fontSize: 12, fills: [{ color: C.black }] },
        ],
    },
    // Divider (horizontal)
    {
        name: 'Atom/Divider',
        type: 'COMPONENT',
        width: 200,
        height: 1,
        fills: [],
        strokes: [{ color: C.neutral300, weight: 1 }],
    },
    // Badge (green, small)
    {
        name: 'Atom/Badge',
        type: 'COMPONENT',
        height: 36,
        cornerRadius: 6,
        fills: [{ color: C.tintGreen }],
        strokes: [{ color: C.green, weight: 2 }],
        autoLayout: {
            direction: 'VERTICAL',
            padding: { top: 4, right: 8, bottom: 4, left: 8 },
            gap: 4,
            alignItems: 'CENTER',
            justifyContent: 'CENTER',
        },
        children: [
            { name: 'Label', type: 'TEXT', text: '42', fontSize: 14, fills: [{ color: C.black }] },
        ],
    },
    // Chip (glass, green)
    {
        name: 'Atom/Chip',
        type: 'COMPONENT',
        height: 28,
        cornerRadius: 8,
        fills: [{ color: C.tintGreen }],
        strokes: [{ color: C.green, weight: 1 }],
        autoLayout: {
            direction: 'HORIZONTAL',
            padding: { top: 6, right: 12, bottom: 6, left: 12 },
            gap: 8,
            alignItems: 'CENTER',
            justifyContent: 'CENTER',
        },
        children: [
            { name: 'Label', type: 'TEXT', text: 'Tag', fontSize: 12, fills: [{ color: C.black }] },
        ],
    },
    // Card (flat, base)
    {
        name: 'Atom/Card',
        type: 'COMPONENT',
        width: 280,
        height: 160,
        cornerRadius: 32,
        fills: [{ color: C.white }],
        strokes: [{ color: C.neutral300, weight: 1 }],
        autoLayout: {
            direction: 'VERTICAL',
            padding: 16,
            gap: 12,
            alignItems: 'MIN',
            justifyContent: 'MIN',
        },
        children: [
            { name: 'Headline', type: 'TEXT', text: 'Card Title', fontSize: 18, fills: [{ color: C.black }] },
            { name: 'Body', type: 'TEXT', text: 'Card content goes here.', fontSize: 14, fills: [{ color: C.black }] },
        ],
    },
    // Typography samples
    {
        name: 'Atom/Typography/H1',
        type: 'COMPONENT',
        autoLayout: { direction: 'VERTICAL', padding: 0, gap: 0, alignItems: 'MIN', justifyContent: 'MIN' },
        children: [{ name: 'Text', type: 'TEXT', text: 'Heading 1', fontSize: 32, fills: [{ color: C.black }] }],
    },
    {
        name: 'Atom/Typography/Body1',
        type: 'COMPONENT',
        autoLayout: { direction: 'VERTICAL', padding: 0, gap: 0, alignItems: 'MIN', justifyContent: 'MIN' },
        children: [{ name: 'Text', type: 'TEXT', text: 'Body text', fontSize: 16, fills: [{ color: C.black }] }],
    },
    // Avatar (md, circle, fallback initials)
    {
        name: 'Atom/Avatar',
        type: 'COMPONENT',
        width: 40,
        height: 40,
        cornerRadius: 20,
        fills: [{ color: C.tintPurple }],
        autoLayout: {
            direction: 'HORIZONTAL',
            padding: 0,
            alignItems: 'CENTER',
            justifyContent: 'CENTER',
        },
        children: [
            { name: 'Initials', type: 'TEXT', text: 'JD', fontSize: 13, fills: [{ color: C.black }] },
        ],
    },
    // Input (frame)
    {
        name: 'Atom/Input',
        type: 'COMPONENT',
        width: 200,
        height: 36,
        cornerRadius: 20,
        fills: [{ color: C.white }],
        strokes: [{ color: C.neutral300, weight: 1 }],
        autoLayout: {
            direction: 'HORIZONTAL',
            padding: { top: 8, right: 12, bottom: 8, left: 12 },
            gap: 8,
            alignItems: 'CENTER',
            justifyContent: 'MIN',
        },
        children: [
            { name: 'Placeholder', type: 'TEXT', text: 'Placeholder', fontSize: 12, fills: [{ color: C.neutral300 }] },
        ],
    },
    // Label
    {
        name: 'Atom/Label',
        type: 'COMPONENT',
        autoLayout: { direction: 'VERTICAL', padding: 0, gap: 0, alignItems: 'MIN', justifyContent: 'MIN' },
        children: [
            { name: 'Text', type: 'TEXT', text: 'LABEL', fontSize: 12, fills: [{ color: C.black }] },
        ],
    },
    // Progress bar
    {
        name: 'Atom/Progress',
        type: 'COMPONENT',
        width: 200,
        height: 6,
        cornerRadius: 3,
        fills: [{ color: C.neutralLight }],
        autoLayout: {
            direction: 'HORIZONTAL',
            padding: 0,
            alignItems: 'CENTER',
            justifyContent: 'MIN',
        },
        children: [
            {
                name: 'Bar',
                type: 'RECTANGLE',
                width: 120,
                height: 6,
                cornerRadius: 3,
                fills: [{ color: C.green }],
            },
        ],
    },
    // AspectRatio (16:9 container)
    {
        name: 'Atom/AspectRatio',
        type: 'COMPONENT',
        width: 320,
        height: 180,
        cornerRadius: 8,
        fills: [{ color: 'rgba(0, 0, 0, 0.08)' }],
        autoLayout: {
            direction: 'VERTICAL',
            padding: 0,
            alignItems: 'CENTER',
            justifyContent: 'CENTER',
        },
        children: [
            { name: 'Content', type: 'TEXT', text: '16:9', fontSize: 14, fills: [{ color: C.black }] },
        ],
    },
];
