import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // This will expose it to the external network
    port: 5173,  // Default Vite port
  },
  build: {
    outDir: 'build',  // Set Vite to output to 'build' instead of 'dist'
  },
});
