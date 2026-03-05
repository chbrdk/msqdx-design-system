import { MsqdxComponent } from './schema';
import { hexToRgb, parseColor } from './utils';

// Hardcoded definitions for POC - in real world this comes from JSON
export const COMPONENT_DEFINITIONS: MsqdxComponent[] = [
    // --- ATOMS (Simplified) ---
    {
        name: 'Atom/Checkbox',
        type: 'COMPONENT_SET',
        variants: [
            {
                name: 'State=Default',
                type: 'COMPONENT',
                width: 24,
                height: 24,
                cornerRadius: 6,
                strokes: [{ color: '#d4d2d2', weight: 1 }],
                fills: [{ color: '#ffffff' }],
                layoutSizingHorizontal: 'FIXED',
                layoutSizingVertical: 'FIXED'
            },
            {
                name: 'State=Checked',
                type: 'COMPONENT',
                width: 24,
                height: 24,
                cornerRadius: 6,
                strokes: [{ color: '#00ca55', weight: 1 }], // Brand color
                fills: [{ color: '#00ca55' }],
                layoutSizingHorizontal: 'FIXED',
                layoutSizingVertical: 'FIXED',
                children: [
                    {
                        name: 'Check Icon',
                        type: 'TEXT',
                        text: '✓',
                        fontSize: 16,
                        fills: [{ color: '#ffffff' }],
                        x: 4, // Center approx
                        y: 2
                    }
                ]
            }
        ]
    },
    {
        name: 'Atom/Label',
        type: 'COMPONENT',
        width: 100,
        height: 24,
        layoutSizingHorizontal: 'HUG',
        layoutSizingVertical: 'HUG',
        autoLayout: {
            direction: 'HORIZONTAL',
            padding: { top: 0, bottom: 0, left: 0, right: 0 },
            gap: 0,
            alignItems: 'CENTER',
            justifyContent: 'CENTER'
        },
        children: [{
            name: 'Text',
            type: 'TEXT',
            text: 'Label',
            fontSize: 14,
            fills: [{ color: '#0f172a' }]
        }]
    },

    // --- MOLECULES (Using Instances) ---
    {
        name: 'Molecule/CheckboxField',
        type: 'COMPONENT',
        width: 300,
        height: 40,
        layoutSizingHorizontal: 'HUG',
        layoutSizingVertical: 'HUG',
        autoLayout: {
            direction: 'HORIZONTAL',
            gap: 12,
            alignItems: 'CENTER',
            justifyContent: 'MIN',
            padding: 8
        },
        children: [
            {
                name: 'Checkbox Instance',
                type: 'COMPONENT_INSTANCE',
                componentId: 'Atom/Checkbox',
                width: 24,
                height: 24
            },
            {
                name: 'Label Instance',
                type: 'COMPONENT_INSTANCE',
                componentId: 'Atom/Label',
                layoutSizingHorizontal: 'HUG',
                layoutSizingVertical: 'HUG'
            }
        ]
    },
    {
        name: 'Molecule/Card',
        type: 'COMPONENT',
        width: 320,
        height: 200,
        layoutSizingHorizontal: 'FIXED',
        layoutSizingVertical: 'HUG',
        cornerRadius: 12,
        fills: [{ color: '#ffffff' }],
        strokes: [{ color: '#e2e8f0', weight: 1 }],
        autoLayout: {
            direction: 'VERTICAL',
            padding: 24,
            gap: 16,
            alignItems: 'STRETCH',
            justifyContent: 'MIN'
        },
        children: [
            {
                name: 'Header',
                type: 'FRAME',
                layoutSizingHorizontal: 'FILL',
                layoutSizingVertical: 'HUG',
                autoLayout: {
                    direction: 'HORIZONTAL',
                    gap: 8,
                    alignItems: 'CENTER',
                    justifyContent: 'SPACE_BETWEEN'
                },
                children: [
                    {
                        name: 'Title',
                        type: 'TEXT',
                        text: 'Card Title',
                        fontSize: 18,
                        fontWeight: 'Bold',
                        fills: [{ color: '#0f172a' }]
                    }
                ]
            },
            {
                name: 'Content',
                type: 'TEXT',
                text: 'This is a card description utilizing atomic design principles.',
                fontSize: 14,
                fills: [{ color: '#475569' }],
                layoutSizingHorizontal: 'FILL',
                layoutSizingVertical: 'HUG'
            },
            {
                name: 'Action Area',
                type: 'FRAME',
                layoutSizingHorizontal: 'FILL',
                layoutSizingVertical: 'HUG',
                autoLayout: {
                    direction: 'HORIZONTAL',
                    gap: 8,
                    alignItems: 'CENTER',
                    justifyContent: 'MAX'
                },
                children: [
                    {
                        name: 'Button Primary',
                        type: 'COMPONENT_INSTANCE',
                        componentId: 'Atom/Button/Primary', // Assuming this exists or will exist
                        layoutSizingHorizontal: 'HUG',
                        layoutSizingVertical: 'HUG'
                    }
                ]
            }
        ]
    },
    // --- BATCH 2: CONTENT MOLECULES ---
    {
        name: 'Molecule/Accordion',
        type: 'COMPONENT',
        width: 320,
        height: 48,
        layoutSizingHorizontal: 'FIXED',
        layoutSizingVertical: 'HUG',
        children: [
            {
                name: 'Summary',
                type: 'FRAME',
                layoutSizingHorizontal: 'FILL',
                layoutSizingVertical: 'HUG',
                autoLayout: {
                    direction: 'HORIZONTAL',
                    padding: { top: 12, right: 16, bottom: 12, left: 16 },
                    gap: 8,
                    alignItems: 'CENTER',
                    justifyContent: 'SPACE_BETWEEN'
                },
                strokes: [{ color: 'rgba(0, 0, 0, 0.12)', weight: 1 }], // Border bottom simulation
                children: [
                    {
                        name: 'Label',
                        type: 'TEXT',
                        text: 'Accordion Title',
                        fontSize: 16,
                        fontWeight: 'Medium',
                        layoutSizingHorizontal: 'FILL',
                        layoutSizingVertical: 'HUG'
                    },
                    {
                        name: 'Expand Icon Core',
                        type: 'FRAME',
                        width: 28,
                        height: 28,
                        cornerRadius: 100, // Circle
                        strokes: [{ color: 'rgba(0, 0, 0, 0.24)', weight: 1 }],
                        autoLayout: {
                            direction: 'HORIZONTAL',
                            alignItems: 'CENTER',
                            justifyContent: 'CENTER'
                        },
                        children: [
                            {
                                name: 'Icon',
                                type: 'COMPONENT_INSTANCE',
                                componentId: 'Atom/Icon/ExpandMore',
                                width: 20,
                                height: 20
                            }
                        ]
                    }
                ]
            },
            {
                name: 'Details Panel',
                type: 'FRAME',
                layoutSizingHorizontal: 'FILL',
                layoutSizingVertical: 'HUG',
                autoLayout: {
                    direction: 'VERTICAL',
                    padding: 16
                },
                // Hidden by default in Figma component usually, but we show expanded state as default
                children: [
                    {
                        name: 'Content',
                        type: 'TEXT',
                        text: 'This is the accordion content panel.',
                        fontSize: 14,
                        lineHeight: 20,
                        layoutSizingHorizontal: 'FILL',
                        layoutSizingVertical: 'HUG'
                    }
                ]
            }
        ]
    },
    {
        name: 'Molecule/GlassCard',
        type: 'COMPONENT',
        width: 320,
        height: 200,
        layoutSizingHorizontal: 'FIXED',
        layoutSizingVertical: 'HUG',
        cornerRadius: 32, // 'button' radius for desktop
        fills: [{ color: '#ffffff', opacity: 0.05 }], // alpha(white, 0.05)
        strokes: [{ color: '#ffffff', opacity: 0.12 }],
        effects: [
            {
                type: 'BACKGROUND_BLUR',
                radius: 12,
                visible: true
            },
            {
                type: 'DROP_SHADOW',
                color: '#000000',
                radius: 8, // sm shadow
                offset: { x: 0, y: 2 },
                visible: true
            }
        ],
        autoLayout: {
            direction: 'VERTICAL',
            padding: 24, // lg padding
            gap: 16
        },
        children: [
            {
                name: 'Content Slot',
                type: 'FRAME',
                layoutSizingHorizontal: 'FILL',
                layoutSizingVertical: 'HUG',
                children: [
                    {
                        name: 'Placeholder Text',
                        type: 'TEXT',
                        text: 'Glass Card Content',
                        fontSize: 16,
                        fills: [{ color: '#ffffff' }]
                    }
                ]
            }
        ]
    },
    {
        name: 'Molecule/Tooltip',
        type: 'COMPONENT',
        layoutSizingHorizontal: 'HUG',
        layoutSizingVertical: 'HUG',
        cornerRadius: 12, // 'lg'
        fills: [{ color: '#fafafa' }], // MSQDX_NEUTRAL[50]
        strokes: [{ color: 'rgba(0, 0, 0, 0.12)', weight: 1 }],
        effects: [
            {
                type: 'DROP_SHADOW',
                color: '#000000',
                radius: 16, // lg shadow
                offset: { x: 0, y: 8 },
                visible: true
            }
        ],
        autoLayout: {
            direction: 'HORIZONTAL',
            padding: { top: 8, right: 12, bottom: 8, left: 12 }, // sm md
            gap: 0,
            alignItems: 'CENTER',
            justifyContent: 'CENTER'
        },
        children: [
            {
                name: 'Tooltip Text',
                type: 'TEXT',
                text: 'Tooltip Text',
                fontSize: 14, // sm
                fills: [{ color: '#171717' }] // MSQDX_NEUTRAL[900]
            }
            // Arrow is usually outside or handled via absolute prop in React, skipped for basic frame
        ]
    },
    // --- BATCH 1: INPUT MOLECULES ---
    {
        name: 'Molecule/RadioField',
        type: 'COMPONENT',
        width: 300,
        height: 120, // Estimated
        layoutSizingHorizontal: 'FIXED', // Width often controlled by container
        layoutSizingVertical: 'HUG',
        autoLayout: {
            direction: 'VERTICAL',
            gap: 12, // MSQDX_INPUT.label.gap
            alignItems: 'MIN',
            justifyContent: 'MIN',
        },
        children: [
            {
                name: 'Label Group',
                type: 'FRAME',
                layoutSizingHorizontal: 'FILL',
                layoutSizingVertical: 'HUG',
                autoLayout: {
                    direction: 'HORIZONTAL',
                    gap: 4,
                    alignItems: 'CENTER'
                },
                children: [
                    {
                        name: 'Label',
                        type: 'TEXT',
                        text: 'Radio Field Label',
                        fontSize: 14, // MSQDX_INPUT.label.fontSize
                        fills: [{ color: '#00ca55' }] // getLabelColor default
                    }
                ]
            },
            {
                name: 'Radio Group',
                type: 'FRAME',
                layoutSizingHorizontal: 'FILL',
                layoutSizingVertical: 'HUG',
                autoLayout: {
                    direction: 'VERTICAL',
                    gap: 0,
                    alignItems: 'MIN',
                    justifyContent: 'MIN'
                },
                children: [
                    {
                        name: 'Option 1',
                        type: 'FRAME',
                        layoutSizingHorizontal: 'FILL',
                        layoutSizingVertical: 'HUG',
                        autoLayout: {
                            direction: 'HORIZONTAL',
                            gap: 12,
                            alignItems: 'CENTER',
                            padding: { top: 8, bottom: 8, left: 8, right: 8 }
                        },
                        children: [
                            {
                                name: 'Radio Button',
                                type: 'COMPONENT_INSTANCE',
                                componentId: 'Atom/Checkbox', // Reuse Checkbox visual for now or need Atom/Radio
                                width: 20,
                                height: 20
                            },
                            {
                                name: 'Option Label',
                                type: 'TEXT',
                                text: 'Option 1',
                                fontSize: 16
                            }
                        ]
                    },
                    {
                        name: 'Option 2',
                        type: 'FRAME',
                        layoutSizingHorizontal: 'FILL',
                        layoutSizingVertical: 'HUG',
                        autoLayout: {
                            direction: 'HORIZONTAL',
                            gap: 12,
                            alignItems: 'CENTER',
                            padding: { top: 8, bottom: 8, left: 8, right: 8 }
                        },
                        children: [
                            {
                                name: 'Radio Button',
                                type: 'COMPONENT_INSTANCE',
                                componentId: 'Atom/Checkbox',
                                width: 20,
                                height: 20
                            },
                            {
                                name: 'Option Label',
                                type: 'TEXT',
                                text: 'Option 2',
                                fontSize: 16
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        name: 'Molecule/SearchField',
        type: 'COMPONENT',
        width: 300,
        height: 48,
        layoutSizingHorizontal: 'FIXED',
        layoutSizingVertical: 'FIXED',
        cornerRadius: 8, // MSQDX_INPUT.borderRadius
        strokes: [{ color: 'rgba(0, 0, 0, 0.12)', weight: 1 }],
        fills: [{ color: '#f8f6f0' }],
        autoLayout: {
            direction: 'HORIZONTAL',
            gap: 8,
            padding: { left: 16, right: 16, top: 0, bottom: 0 },
            alignItems: 'CENTER',
            justifyContent: 'MIN'
        },
        children: [
            {
                name: 'Start Icon',
                type: 'COMPONENT_INSTANCE',
                componentId: 'Atom/Icon/Search', // Assuming specific Atom exists or generic wrapper
                width: 20,
                height: 20
            },
            {
                name: 'Input Text',
                type: 'TEXT',
                text: 'Search...',
                fontSize: 16,
                fills: [{ color: 'rgba(0,0,0,0.5)' }], // Placeholder
                layoutSizingHorizontal: 'FILL',
                layoutSizingVertical: 'HUG'
            }
        ]
    },
    {
        name: 'Molecule/TextareaField',
        type: 'COMPONENT',
        width: 300,
        height: 120,
        layoutSizingHorizontal: 'FIXED',
        layoutSizingVertical: 'FIXED', // or HUG if multiline grows
        children: [
            {
                name: 'Wrapper',
                type: 'FRAME',
                layoutSizingHorizontal: 'FILL',
                layoutSizingVertical: 'FILL',
                autoLayout: {
                    direction: 'VERTICAL',
                    gap: 8,
                    alignItems: 'MIN'
                },
                children: [
                    {
                        name: 'Label',
                        type: 'TEXT',
                        text: 'Textarea Label',
                        fontSize: 14,
                        fills: [{ color: '#00ca55' }]
                    },
                    {
                        name: 'Input Area',
                        type: 'FRAME',
                        layoutSizingHorizontal: 'FILL',
                        layoutSizingVertical: 'FILL',
                        cornerRadius: 8,
                        strokes: [{ color: 'rgba(0, 0, 0, 0.12)', weight: 1 }],
                        fills: [{ color: '#f8f6f0' }],
                        autoLayout: {
                            direction: 'HORIZONTAL',
                            padding: 12,
                            gap: 8
                        },
                        children: [
                            {
                                name: 'Value',
                                type: 'TEXT',
                                text: 'Enter text here...',
                                fontSize: 16,
                                layoutSizingHorizontal: 'FILL',
                                layoutSizingVertical: 'HUG'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        name: 'Molecule/Select',
        type: 'COMPONENT',
        width: 300,
        height: 48,
        layoutSizingHorizontal: 'FIXED',
        layoutSizingVertical: 'HUG',
        children: [
            {
                name: 'Wrapper',
                type: 'FRAME',
                layoutSizingHorizontal: 'FILL',
                layoutSizingVertical: 'HUG',
                autoLayout: {
                    direction: 'VERTICAL',
                    gap: 8
                },
                children: [
                    {
                        name: 'Label',
                        type: 'TEXT',
                        text: 'Select Label',
                        fontSize: 14,
                        fills: [{ color: '#00ca55' }]
                    },
                    {
                        name: 'Input Core',
                        type: 'FRAME',
                        layoutSizingHorizontal: 'FILL',
                        height: 40, // Small default
                        layoutSizingVertical: 'FIXED',
                        cornerRadius: 8,
                        strokes: [{ color: 'rgba(0, 0, 0, 0.12)', weight: 1 }],
                        fills: [{ color: '#f8f6f0' }],
                        autoLayout: {
                            direction: 'HORIZONTAL',
                            padding: { left: 12, right: 36, top: 0, bottom: 0 }, // Right padding for icon
                            alignItems: 'CENTER',
                            justifyContent: 'SPACE_BETWEEN'
                        },
                        children: [
                            {
                                name: 'Value',
                                type: 'TEXT',
                                text: 'Selected Option',
                                fontSize: 14
                            },
                            {
                                name: 'Dropdown Icon',
                                type: 'COMPONENT_INSTANCE',
                                componentId: 'Atom/Icon/ArrowDropDown', // Needs explicit Atom or vector
                                width: 24,
                                height: 24,
                                x: 260, // Positioned absolute in CSS, here auto-layout approximation
                                y: 8
                            }
                        ]
                    }
                ]
            }
        ]
    },
    // --- BATCH 3: NAV & FEEDBACK MOLECULES ---
    {
        name: 'Molecule/Tabs',
        type: 'COMPONENT',
        width: 320,
        height: 48,
        layoutSizingHorizontal: 'FIXED',
        layoutSizingVertical: 'FIXED',
        strokes: [{ color: 'rgba(0, 0, 0, 0.08)', weight: 1 }],
        autoLayout: {
            direction: 'HORIZONTAL',
            gap: 0,
            alignItems: 'MAX',
            justifyContent: 'MIN'
        },
        children: [
            {
                name: 'Tab 1 (Active)',
                type: 'FRAME',
                layoutSizingHorizontal: 'HUG',
                layoutSizingVertical: 'FILL',
                autoLayout: {
                    direction: 'VERTICAL',
                    justifyContent: 'SPACE_BETWEEN',
                    alignItems: 'CENTER',
                    padding: { top: 12, bottom: 0, left: 20, right: 20 }
                },
                children: [
                    {
                        name: 'Label',
                        type: 'TEXT',
                        text: 'Overview',
                        fontSize: 14,
                        fontWeight: 'SemiBold',
                        fills: [{ color: '#00ca55' }]
                    },
                    {
                        name: 'Indicator',
                        type: 'RECTANGLE',
                        width: 40,
                        height: 3,
                        cornerRadius: 3,
                        fills: [{ color: '#00ca55' }],
                        layoutSizingHorizontal: 'FILL'
                    }
                ]
            },
            {
                name: 'Tab 2 (Inactive)',
                type: 'FRAME',
                layoutSizingHorizontal: 'HUG',
                layoutSizingVertical: 'FILL',
                autoLayout: {
                    direction: 'VERTICAL',
                    justifyContent: 'CENTER',
                    alignItems: 'CENTER',
                    padding: { top: 12, bottom: 12, left: 20, right: 20 }
                },
                children: [
                    {
                        name: 'Label',
                        type: 'TEXT',
                        text: 'Settings',
                        fontSize: 14,
                        fontWeight: 'Medium',
                        fills: [{ color: 'rgba(0,0,0,0.6)' }]
                    }
                ]
            }
        ]
    },
    {
        name: 'Molecule/Stepper',
        type: 'COMPONENT',
        width: 400,
        height: 40,
        layoutSizingHorizontal: 'FIXED',
        layoutSizingVertical: 'HUG',
        autoLayout: {
            direction: 'HORIZONTAL',
            gap: 0,
            alignItems: 'CENTER',
            justifyContent: 'SPACE_BETWEEN'
        },
        children: [
            {
                name: 'Step 1 (Completed)',
                type: 'FRAME',
                layoutSizingHorizontal: 'HUG',
                layoutSizingVertical: 'HUG',
                autoLayout: { direction: 'HORIZONTAL', gap: 8, alignItems: 'CENTER' },
                children: [
                    {
                        name: 'Icon',
                        type: 'FRAME',
                        width: 24,
                        height: 24,
                        cornerRadius: 100,
                        fills: [{ color: '#22c55e' }],
                        autoLayout: { direction: 'HORIZONTAL', alignItems: 'CENTER', justifyContent: 'CENTER' },
                        children: [{ name: 'Check', type: 'TEXT', text: '✓', fontSize: 12, fills: [{ color: '#ffffff' }] }]
                    },
                    {
                        name: 'Label',
                        type: 'TEXT',
                        text: 'Account',
                        fontSize: 14,
                        fontWeight: 'SemiBold',
                        fills: [{ color: '#22c55e' }]
                    }
                ]
            },
            {
                name: 'Connector 1',
                type: 'RECTANGLE',
                height: 2,
                layoutSizingHorizontal: 'FILL',
                fills: [{ color: '#22c55e' }]
            },
            {
                name: 'Step 2 (Active)',
                type: 'FRAME',
                layoutSizingHorizontal: 'HUG',
                layoutSizingVertical: 'HUG',
                autoLayout: { direction: 'HORIZONTAL', gap: 8, alignItems: 'CENTER' },
                children: [
                    {
                        name: 'Icon',
                        type: 'FRAME',
                        width: 24,
                        height: 24,
                        cornerRadius: 100,
                        fills: [{ color: '#00ca55' }],
                        autoLayout: { direction: 'HORIZONTAL', alignItems: 'CENTER', justifyContent: 'CENTER' },
                        children: [{ name: 'Num', type: 'TEXT', text: '2', fontSize: 12, fills: [{ color: '#ffffff' }] }]
                    },
                    {
                        name: 'Label',
                        type: 'TEXT',
                        text: 'Personal',
                        fontSize: 14,
                        fontWeight: 'SemiBold',
                        fills: [{ color: '#0f172a' }]
                    }
                ]
            },
            {
                name: 'Connector 2',
                type: 'RECTANGLE',
                height: 2,
                layoutSizingHorizontal: 'FILL',
                fills: [{ color: 'rgba(0,0,0,0.12)' }]
            },
            {
                name: 'Step 3 (Pending)',
                type: 'FRAME',
                layoutSizingHorizontal: 'HUG',
                layoutSizingVertical: 'HUG',
                children: [
                    {
                        name: 'Icon',
                        type: 'FRAME',
                        width: 24,
                        height: 24,
                        cornerRadius: 100,
                        fills: [{ color: 'rgba(0,0,0,0.1)' }],
                        autoLayout: { direction: 'HORIZONTAL', alignItems: 'CENTER', justifyContent: 'CENTER' },
                        children: [{ name: 'Num', type: 'TEXT', text: '3', fontSize: 12, fills: [{ color: 'rgba(0,0,0,0.5)' }] }]
                    }
                ]
            }
        ]
    },
    {
        name: 'Molecule/Snackbar',
        type: 'COMPONENT',
        layoutSizingHorizontal: 'HUG',
        layoutSizingVertical: 'HUG',
        cornerRadius: 8,
        fills: [{ color: '#fafafa' }],
        strokes: [{ color: 'rgba(0,0,0,0.12)', weight: 1 }],
        effects: [
            { type: 'DROP_SHADOW', color: '#000000', radius: 16, offset: { x: 0, y: 6 }, visible: true }
        ],
        autoLayout: {
            direction: 'HORIZONTAL',
            padding: { top: 8, bottom: 8, left: 16, right: 8 },
            gap: 8,
            alignItems: 'CENTER'
        },
        children: [
            {
                name: 'Message',
                type: 'TEXT',
                text: 'Operation successful.',
                fontSize: 13,
                fontFamily: 'Mono',
                fills: [{ color: '#171717' }]
            },
            {
                name: 'Action',
                type: 'FRAME',
                layoutSizingHorizontal: 'HUG',
                layoutSizingVertical: 'HUG',
                children: [
                    {
                        name: 'Button',
                        type: 'COMPONENT_INSTANCE',
                        componentId: 'Atom/Button/Ghost',
                        width: 60,
                        height: 32
                    }
                ]
            }
        ]
    },
    {
        name: 'Molecule/Dialog',
        type: 'COMPONENT',
        width: 560,
        height: 300,
        layoutSizingHorizontal: 'FIXED',
        layoutSizingVertical: 'HUG',
        cornerRadius: 12,
        fills: [{ color: '#ffffff' }],
        strokes: [{ color: 'rgba(0,0,0,0.12)', weight: 1 }],
        effects: [
            { type: 'DROP_SHADOW', color: '#000000', radius: 24, offset: { x: 0, y: 20 }, visible: true }
        ],
        autoLayout: {
            direction: 'VERTICAL',
            gap: 0,
            padding: 0
        },
        children: [
            {
                name: 'Title Bar',
                type: 'FRAME',
                layoutSizingHorizontal: 'FILL',
                layoutSizingVertical: 'HUG',
                autoLayout: {
                    direction: 'HORIZONTAL',
                    padding: { top: 16, bottom: 8, left: 24, right: 24 },
                    alignItems: 'CENTER',
                    justifyContent: 'SPACE_BETWEEN'
                },
                strokes: [{ color: 'rgba(0,0,0,0.12)', weight: 1 }],
                children: [
                    {
                        name: 'Title',
                        type: 'TEXT',
                        text: 'Dialog Title',
                        fontSize: 18,
                        fontWeight: 'SemiBold',
                        fills: [{ color: '#0f172a' }]
                    },
                    {
                        name: 'Close Icon',
                        type: 'COMPONENT_INSTANCE',
                        componentId: 'Atom/Icon/Close',
                        width: 24,
                        height: 24
                    }
                ]
            },
            {
                name: 'Content',
                type: 'FRAME',
                layoutSizingHorizontal: 'FILL',
                layoutSizingVertical: 'HUG',
                autoLayout: {
                    direction: 'VERTICAL',
                    padding: 24
                },
                children: [
                    {
                        name: 'Body Text',
                        type: 'TEXT',
                        text: 'This is the dialog content body.',
                        fontSize: 14,
                        lineHeight: 20,
                        layoutSizingHorizontal: 'FILL',
                        layoutSizingVertical: 'HUG',
                        fills: [{ color: '#0f172a' }]
                    }
                ]
            },
            {
                name: 'Actions',
                type: 'FRAME',
                layoutSizingHorizontal: 'FILL',
                layoutSizingVertical: 'HUG',
                autoLayout: {
                    direction: 'HORIZONTAL',
                    padding: 16,
                    gap: 8,
                    justifyContent: 'MAX'
                },
                children: [
                    {
                        name: 'Cancel Button',
                        type: 'COMPONENT_INSTANCE',
                        componentId: 'Atom/Button/Secondary',
                        width: 80,
                        height: 36
                    },
                    {
                        name: 'Confirm Button',
                        type: 'COMPONENT_INSTANCE',
                        componentId: 'Atom/Button/Primary',
                        width: 80,
                        height: 36
                    }
                ]
            }
        ]
    }
];

export async function syncComponents() {
    console.log('Syncing MSQDX Components...');
    const page = figma.currentPage;

    try {
        for (const comp of COMPONENT_DEFINITIONS) {
            await createNode(comp, page);
        }
        figma.notify(`Created ${COMPONENT_DEFINITIONS.length} components (Atoms + Molecules)`);
    } catch (e) {
        console.error(e);
        figma.notify('Error creating components: ' + (e instanceof Error ? e.message : String(e)));
    }
}

async function createNode(def: MsqdxComponent, parent: BaseNode & ChildrenMixin) {
    let node: SceneNode;

    if (def.type === 'COMPONENT_INSTANCE') {
        if (!def.componentId) {
            console.error(`Component instance ${def.name} missing componentId`);
            return figma.createFrame(); // Fallback
        }

        // Find master component
        // Strategy: Look in current page, then document. ideally should be robust.
        // For this POC we assume atoms are on the current page or we scan for them.
        const atoms = figma.currentPage.findAll(n => n.type === 'COMPONENT' || n.type === 'COMPONENT_SET') as (ComponentNode | ComponentSetNode)[];
        let master = atoms.find(c => c.name === def.componentId || c.name === def.name) as ComponentNode | ComponentSetNode | undefined;

        if (master && master.type === 'COMPONENT_SET') {
            // If it's a set, use the default variant, or the first one
            master = master.defaultVariant as ComponentNode;
            if (!master) {
                // Fallback if no default set
                master = (master as ComponentSetNode).children[0] as ComponentNode;
            }
        }

        // Assert master is now a ComponentNode
        const componentMaster = master as ComponentNode;

        if (componentMaster) {
            const instance = componentMaster.createInstance();
            instance.name = def.name;
            if (parent.type !== 'DOCUMENT') parent.appendChild(instance);
            // Apply overrides if needed (sizing, etc.)
            if (def.width && def.height) instance.resize(def.width, def.height);

            // Apply Layout Sizing
            // Apply Layout Sizing (Context Sensitive)
            const parentHasLayout = 'layoutMode' in parent && parent.layoutMode !== 'NONE';

            if (parentHasLayout) {
                if (def.layoutSizingHorizontal) {
                    if (def.layoutSizingHorizontal === 'HUG' && instance.layoutMode === 'NONE') {
                        // Cannot HUG if no AL. Revert to FIXED or FILL?
                        // console.warn('Cannot set HUG on non-AL instance:', instance.name);
                    } else {
                        instance.layoutSizingHorizontal = def.layoutSizingHorizontal;
                    }
                }
                if (def.layoutSizingVertical) {
                    if (def.layoutSizingVertical === 'HUG' && instance.layoutMode === 'NONE') {
                        // skip
                    } else {
                        instance.layoutSizingVertical = def.layoutSizingVertical;
                    }
                }
            } else {
                // Try to apply internal sizing if master has AL
                if (instance.layoutMode !== 'NONE') {
                    const isHorz = instance.layoutMode === 'HORIZONTAL';
                    if (def.layoutSizingHorizontal === 'HUG') {
                        if (isHorz) instance.primaryAxisSizingMode = 'AUTO'; else instance.counterAxisSizingMode = 'AUTO';
                    } else if (def.layoutSizingHorizontal === 'FIXED') {
                        if (isHorz) instance.primaryAxisSizingMode = 'FIXED'; else instance.counterAxisSizingMode = 'FIXED';
                    }

                    if (def.layoutSizingVertical === 'HUG') {
                        if (isHorz) instance.counterAxisSizingMode = 'AUTO'; else instance.primaryAxisSizingMode = 'AUTO';
                    } else if (def.layoutSizingVertical === 'FIXED') {
                        if (isHorz) instance.counterAxisSizingMode = 'FIXED'; else instance.primaryAxisSizingMode = 'FIXED';
                    }
                }
            }

            node = instance;
        } else {
            figma.notify(`Master component not found: ${def.componentId}`);
            const fallback = figma.createFrame();
            fallback.name = `[MISSING] ${def.name}`;
            if (parent.type !== 'DOCUMENT') parent.appendChild(fallback);
            fallback.fills = [{ type: 'SOLID', color: { r: 1, g: 0, b: 0 } }];
            node = fallback;
        }
    } else if (def.type === 'COMPONENT_SET') {
        const variants: ComponentNode[] = [];
        // 1. Create all internal variants
        if (def.variants) {
            for (const variantDef of def.variants) {
                // Force type to COMPONENT for variants
                // We append them to parent temporarily
                const variantNode = await createNode({ ...variantDef, type: 'COMPONENT' }, parent);
                if (variantNode && variantNode.type === 'COMPONENT') {
                    variants.push(variantNode);
                }
            }
        }

        if (variants.length > 0) {
            // 2. Combine into Component Set
            const componentSet = figma.combineAsVariants(variants, parent);
            componentSet.name = def.name;
            node = componentSet;

            // 3. Apply Frame-like properties to the Set (Layout, Padding, etc.)
            // Reuse the FRAME logic logic? Or just duplicate minimal needed props
            // Sets usually have AutoLayout to organize variants
            if (def.autoLayout) {
                componentSet.layoutMode = def.autoLayout.direction;
                const p = def.autoLayout.padding;
                if (typeof p === 'number') {
                    componentSet.paddingLeft = componentSet.paddingRight = componentSet.paddingTop = componentSet.paddingBottom = p;
                } else if (p) {
                    componentSet.paddingTop = p.top;
                    componentSet.paddingBottom = p.bottom;
                    componentSet.paddingLeft = p.left;
                    componentSet.paddingRight = p.right;
                }
                if (def.autoLayout.gap) componentSet.itemSpacing = def.autoLayout.gap;
            } else {
                // Default layout for set
                componentSet.layoutMode = 'HORIZONTAL';
                componentSet.itemSpacing = 24;
                componentSet.paddingLeft = componentSet.paddingRight = componentSet.paddingTop = componentSet.paddingBottom = 24;
            }

            // Fills/Strokes on the Set itself (usually transparent/dashed, but can be styled)
            if (def.fills) {
                componentSet.fills = def.fills.map(f => {
                    const c = parseColor(f.color) ?? hexToRgb(f.color);
                    return { type: 'SOLID' as const, color: c, opacity: f.opacity ?? c.a ?? 1 };
                });
            }
        } else {
            const frame = figma.createFrame();
            frame.name = `[EMPTY SET] ${def.name}`;
            node = frame;
            if (parent.type !== 'DOCUMENT') parent.appendChild(node);
        }

    } else if (def.type === 'FRAME' || def.type === 'COMPONENT') {
        const frame = def.type === 'COMPONENT' ? figma.createComponent() : figma.createFrame();
        frame.name = def.name;
        if (parent.type !== 'DOCUMENT') parent.appendChild(frame);
        // 1. AutoLayout (Apply FIRST so internal layout is ready)
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

        // 2. Sizing & Constraints
        const parentHasLayout = 'layoutMode' in parent && parent.layoutMode !== 'NONE';

        if (parentHasLayout) {
            // Parent is AutoLayout: Use child sizing props
            if (def.layoutSizingHorizontal) {
                if (def.layoutSizingHorizontal === 'HUG' && frame.layoutMode === 'NONE') {
                    // Skip HUG on non-AL frame
                } else {
                    frame.layoutSizingHorizontal = def.layoutSizingHorizontal;
                }
            }
            if (def.layoutSizingVertical) {
                if (def.layoutSizingVertical === 'HUG' && frame.layoutMode === 'NONE') {
                    // Skip
                } else {
                    frame.layoutSizingVertical = def.layoutSizingVertical;
                }
            }
        } else {
            // Parent is Page or regular Frame: Control internal sizing if frame has Auto Layout
            if (frame.layoutMode !== 'NONE') {
                const isHorizontal = frame.layoutMode === 'HORIZONTAL';

                // Horizontal Sizing
                if (def.layoutSizingHorizontal === 'HUG') {
                    if (isHorizontal) frame.primaryAxisSizingMode = 'AUTO';
                    else frame.counterAxisSizingMode = 'AUTO';
                } else if (def.layoutSizingHorizontal === 'FIXED') {
                    if (isHorizontal) frame.primaryAxisSizingMode = 'FIXED';
                    else frame.counterAxisSizingMode = 'FIXED';
                }

                // Vertical Sizing
                if (def.layoutSizingVertical === 'HUG') {
                    if (isHorizontal) frame.counterAxisSizingMode = 'AUTO';
                    else frame.primaryAxisSizingMode = 'AUTO';
                } else if (def.layoutSizingVertical === 'FIXED') {
                    if (isHorizontal) frame.counterAxisSizingMode = 'FIXED';
                    else frame.primaryAxisSizingMode = 'FIXED';
                }
            }
        }

        // Apply fixed dimensions if needed (explicit check against def)
        if (def.width && def.layoutSizingHorizontal === 'FIXED') frame.resize(def.width, frame.height);
        if (def.height && def.layoutSizingVertical === 'FIXED') frame.resize(frame.width, def.height);

        // Children
        if (def.children) {
            for (const child of def.children) {
                await createNode(child, frame);
            }
        }
        node = frame;
    } else if (def.type === 'TEXT') {
        const text = figma.createText();
        if (parent.type !== 'DOCUMENT') parent.appendChild(text);
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

        // Sizing for Text
        if (parent.type !== 'DOCUMENT' && 'layoutMode' in parent && parent.layoutMode !== 'NONE') {
            if (def.layoutSizingHorizontal) text.layoutSizingHorizontal = def.layoutSizingHorizontal;
            if (def.layoutSizingVertical) text.layoutSizingVertical = def.layoutSizingVertical;
        }
    } else {
        const rect = figma.createRectangle();
        if (parent.type !== 'DOCUMENT') parent.appendChild(rect);
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

        // Sizing for Rect
        if (parent.type !== 'DOCUMENT' && 'layoutMode' in parent && parent.layoutMode !== 'NONE') {
            // Rects cannot HUG, only FIXED or FILL
            if (def.layoutSizingHorizontal && def.layoutSizingHorizontal !== 'HUG') rect.layoutSizingHorizontal = def.layoutSizingHorizontal;
            if (def.layoutSizingVertical && def.layoutSizingVertical !== 'HUG') rect.layoutSizingVertical = def.layoutSizingVertical;
        }
    }


    return node;
}
