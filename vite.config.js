import { defineConfig } from 'vite';
// import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  // plugins: [
  //   cssInjectedByJsPlugin()
  // ],
  build: {
    minify: 'esbuild',
    assetsDir: '',
    rollupOptions: {
      input: 'src/main.js',
      output: {
        entryFileNames: 'external-script-integration.js',
        assetFileNames: '[name].[ext]',
        chunkFileNames: '[name].js',
        manualChunks: undefined,
      },
    },
  },
});
