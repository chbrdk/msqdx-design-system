import { syncTokens } from './tokens';
import { syncButton } from './syncButton';
import { syncAllAtoms } from './syncAtoms';

figma.showUI(__html__, { width: 400, height: 600 });

figma.ui.onmessage = async (msg) => {
    if (msg.type === 'sync-tokens') {
        await syncTokens();
    }
    if (msg.type === 'sync-button') {
        await syncButton();
    }
    if (msg.type === 'sync-atoms') {
        await syncAllAtoms();
    }
    if (msg.type === 'cancel') {
        figma.closePlugin();
    }
};
