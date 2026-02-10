import { syncTokens } from './tokens';
import { syncComponents } from './components';

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 400, height: 600 });

// Msg handler
figma.ui.onmessage = async (msg) => {
    if (msg.type === 'sync-tokens') {
        await syncTokens();
    }

    if (msg.type === 'sync-components') {
        await syncComponents();
    }

    if (msg.type === 'cancel') {
        figma.closePlugin();
    }
};
