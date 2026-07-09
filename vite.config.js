import { defineConfig } from 'vite';
import { copyFileSync, mkdirSync, readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
const version = pkg.version;
const majorVersion = `v${version.split('.')[0]}`;

function copyBuiltFile(source, target) {
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(source, target);
}

export default defineConfig({
  plugins: [
    {
      name: 'cdn-versioning-plugin',
      closeBundle() {
        const builtFile = resolve(__dirname, 'dist/external-script-integration.js');

        copyBuiltFile(builtFile, resolve(__dirname, `dist/${majorVersion}/external-script-integration.js`));
        copyBuiltFile(builtFile, resolve(__dirname, `dist/${version}/external-script-integration.js`));

        console.log(`\n✅ Script copied to /${majorVersion} and /${version}`);
      },
    },
  ],
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
