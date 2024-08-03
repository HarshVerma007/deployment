import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // This ensures that the base path is correct for the deployment
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './index.html',
    },
  },
  server: {
    open: true, // Automatically open the app in the browser
  },
  assetsInclude: ['**/*.gltf', '**/*.glb'], // Include GLTF and GLB files as assets
});
