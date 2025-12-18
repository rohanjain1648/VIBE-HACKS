// backend/start.js
const { spawn } = require('child_process');

console.log('🌏 Starting Rural Connect AI Backend...');

// Start the mock server for demo purposes
const mockServer = spawn('node', ['mock-server.js'], {
    cwd: __dirname,
    stdio: 'inherit'
});

mockServer.on('error', (error) => {
    console.error('❌ Failed to start mock server:', error);
    process.exit(1);
});

mockServer.on('close', (code) => {
    console.log(`🔄 Mock server exited with code ${code}`);
    process.exit(code);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('📴 Received SIGTERM, shutting down gracefully...');
    mockServer.kill('SIGTERM');
});

process.on('SIGINT', () => {
    console.log('📴 Received SIGINT, shutting down gracefully...');
    mockServer.kill('SIGINT');
});

console.log('✅ Backend startup script initialized');