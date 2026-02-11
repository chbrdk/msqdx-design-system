/** Figma color format: r,g,b,a in 0-1 range */
export type FigmaRgba = { r: number; g: number; b: number; a?: number };

export function hexToRgb(hex: string): FigmaRgba {
    // Handle short hex #fff
    if (hex.length === 4) {
        hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    }

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16) / 255,
            g: parseInt(result[2], 16) / 255,
            b: parseInt(result[3], 16) / 255,
        }
        : { r: 0, g: 0, b: 0 };
}

/** Parse rgba(r,g,b,a) or rgba(r,g,b) to Figma format */
export function parseRgba(str: string): FigmaRgba | null {
    const match = str.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/i);
    if (!match) return null;
    return {
        r: parseInt(match[1], 10) / 255,
        g: parseInt(match[2], 10) / 255,
        b: parseInt(match[3], 10) / 255,
        a: match[4] !== undefined ? parseFloat(match[4]) : 1,
    };
}

/** Convert rem string to px number (base 16px) */
export function remToPx(value: string | number): number {
    if (typeof value === 'number') return value;
    const remMatch = value.match(/^([\d.]+)rem$/);
    if (remMatch) return Math.round(parseFloat(remMatch[1]) * 16);
    const pxMatch = value.match(/^([\d.]+)px$/);
    if (pxMatch) return parseFloat(pxMatch[1]);
    return 0;
}

/** Parse color: hex or rgba, return Figma format or null */
export function parseColor(value: string): FigmaRgba | null {
    if (value.startsWith('#')) return hexToRgb(value);
    return parseRgba(value);
}
