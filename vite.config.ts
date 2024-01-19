import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

import vuetify from 'vite-plugin-vuetify';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vue-xeokit/',
  plugins: [
    vue({
      template: { transformAssetUrls: false }
    }),
    vuetify({
      autoImport: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    // Rollup Options
    // https://vitejs.dev/config/build-options.html#build-rollupoptions
    rollupOptions: {
      output: {
        manualChunks: {
          ui: [
            'vue',
            'vuetify'
          ],
          xeokit: [
            '@xeokit/xeokit-sdk',
          ],
        }
      },
    }
  },
});
//vue-xeokit/
