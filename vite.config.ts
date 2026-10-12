import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // React + GSAP (vč. SplitText) + Motion; pro jednostránkový web je jeden bundle v pořádku
    chunkSizeWarningLimit: 700,
  },
});
