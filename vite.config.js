import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Draft mode is on unless VITE_PREVIEW=false: shows the "design draft" banner and
// keeps search engines away. Set VITE_PREVIEW=false for the real launch.
const isPreview = (mode) => loadEnv(mode, process.cwd(), '').VITE_PREVIEW !== 'false'

function previewNoindex(mode) {
  return {
    name: 'preview-noindex',
    transformIndexHtml(html) {
      if (!isPreview(mode)) return html
      return html.replace('</head>', '    <meta name="robots" content="noindex, nofollow" />\n  </head>')
    },
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), previewNoindex(mode)],
  build: {
    chunkSizeWarningLimit: 700, // three.js is lazy-loaded only for the Vanta backgrounds
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router'],
          motion: ['gsap', '@gsap/react', 'lenis'],
        },
      },
    },
  },
}))
