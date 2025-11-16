import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
      '@cmp': '/src/components'
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/scss/_variables.scss" as *;
          @use "@/scss/_mixins.scss" as *;
          `
      }
    }
  }
})
