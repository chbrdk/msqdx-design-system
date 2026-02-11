import React, { useState } from 'react';

function App() {
    const [loading, setLoading] = useState(false);

    const handleSyncTokens = () => {
        setLoading(true);
        // Send message to plugin code
        parent.postMessage({ pluginMessage: { type: 'sync-tokens' } }, '*');
        setTimeout(() => setLoading(false), 1500);
    };

    const handleSyncButton = () => {
        setLoading(true);
        parent.postMessage({ pluginMessage: { type: 'sync-button' } }, '*');
        setTimeout(() => setLoading(false), 2000);
    };

    const handleSyncAllAtoms = () => {
        setLoading(true);
        parent.postMessage({ pluginMessage: { type: 'sync-atoms' } }, '*');
        setTimeout(() => setLoading(false), 15000);
    };

    const btnStyle = {
        padding: '10px 16px',
        background: loading ? '#ccc' : '#00ca55',
        color: 'white',
        border: 'none',
        borderRadius: 6,
        cursor: loading ? 'not-allowed' : 'pointer',
        width: '100%',
        fontWeight: 600,
        marginBottom: '12px',
        transition: 'background 0.2s',
        fontSize: '14px'
    };

    return (
        <div style={{ padding: '24px', fontFamily: '"Inter", sans-serif', color: '#333' }}>
            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px', margin: 0 }}>MSQDX Sync</h1>
                <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>
                    Design System Integration
                </p>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                    onClick={handleSyncTokens}
                    disabled={loading}
                    style={btnStyle}
                >
                    Sync Design Tokens
                </button>

                <button
                    onClick={handleSyncButton}
                    disabled={loading}
                    style={{ ...btnStyle, background: loading ? '#ccc' : '#333' }}
                >
                    Sync Button (variants + variables)
                </button>

                <button
                    onClick={handleSyncAllAtoms}
                    disabled={loading}
                    style={{ ...btnStyle, background: loading ? '#ccc' : '#0066cc' }}
                >
                    Sync All Atoms
                </button>
            </div>

            <div style={{ marginTop: '24px', padding: '12px', background: '#f5f5f5', borderRadius: '8px', fontSize: '11px', color: '#888', lineHeight: 1.5 }}>
                <p style={{ margin: 0 }}>
                    <strong>Note:</strong> Ensure you have run <code>npm run build:json</code> in the tokens package before syncing.
                </p>
            </div>
        </div>
    );
}

export default App;
