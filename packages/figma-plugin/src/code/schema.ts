export interface MsqdxComponent {
    name: string;
    type: 'FRAME' | 'TEXT' | 'RECTANGLE' | 'COMPONENT';
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    fills?: { color: string; opacity?: number }[];
    strokes?: { color: string; weight: number }[];
    cornerRadius?: number;
    text?: string;
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: string;
    autoLayout?: {
        direction: 'HORIZONTAL' | 'VERTICAL';
        padding?: number | { top: number; right: number; bottom: number; left: number };
        gap?: number;
        alignItems?: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH';
        justifyContent?: 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN';
    };
    children?: MsqdxComponent[];
}
