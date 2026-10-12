import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // relativní cesty k assetům: web funguje v kořeni domény i v podsložce (GitHub Pages /nohy/)
  base: './',
  build: {
    // React + GSAP (vč. SplitText) + Motion; pro jednostránkový web je jeden bundle v pořádku
    chunkSizeWarningLimit: 700,
  },
});
