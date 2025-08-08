#!/usr/bin/env node

// Simple start script for Railway deployment
const { spawn } = require('child_process');
const path = require('path');

console.log('Starting Youth Generation Club Backend...');

// Change to backend directory and start the server
const backendPath = path.join(__dirname, 'backend');
process.chdir(backendPath);

// Start the backend server
const server = spawn('npm', ['start'], {
  stdio: 'inherit',
  shell: true
});

server.on('error', (error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
  process.exit(code);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully');
  server.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully');
  server.kill('SIGINT');
});
