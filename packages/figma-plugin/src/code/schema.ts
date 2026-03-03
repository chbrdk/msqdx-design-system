export interface MsqdxComponent {
  name: string;
  type: 'FRAME' | 'TEXT' | 'RECTANGLE' | 'COMPONENT' | 'COMPONENT_INSTANCE' | 'COMPONENT_SET';
  componentId?: string; // For syncing instances (e.g. "Button/Primary")
  width?: number;
  height?: number;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  /*
    layoutSizingHorizontal: 'FIXED' | 'HUG' | 'FILL';
    layoutSizingVertical: 'FIXED' | 'HUG' | 'FILL';
  */
  layoutSizingHorizontal?: 'FIXED' | 'HUG' | 'FILL';
  layoutSizingVertical?: 'FIXED' | 'HUG' | 'FILL';
  x?: number;
  y?: number;
  fills?: { color: string, opacity?: number }[]; // hex or token reference
  strokes?: { color: string, weight: number }[];
  effects?: {
    type: 'DROP_SHADOW' | 'INNER_SHADOW' | 'LAYER_BLUR' | 'BACKGROUND_BLUR';
    color?: string;
    offset?: { x: number, y: number };
    radius: number;
    spread?: number;
    visible?: boolean;
  }[];
  text?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  autoLayout?: {
    direction: 'HORIZONTAL' | 'VERTICAL';
    padding?: number | { top: number, right: number, bottom: number, left: number };
    gap?: number;
    alignItems?: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH'; // counter axis
    justifyContent?: 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN'; // primary axis
  };
  children?: MsqdxComponent[];
  // For Component Sets (Variants)
  variants?: MsqdxComponent[];
  componentSetId?: string; // Optional: ID for the component set if this is a variant
}
