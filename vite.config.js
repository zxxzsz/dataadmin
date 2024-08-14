import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from "path"
// import monacoEditorPlugin from 'vite-plugin-monaco-editor';
// import monacoEditorPlugin from 'vite-plugin-monaco-editor';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/dataadmin',
  plugins: [
    react(),
    // monacoEditorPlugin.default({
    //   // 插件配置
    //   languageWorkers: ['editorWorkerService', 'css', 'html', 'json', 'javascript'],
    //   // languageWorkers: ['editorWorkerService', 'javascript','typescript', 'css', 'html', 'json']
    // })
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ]
    }
  },
  server: {
    host: 'localhost',
    hmr: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

})
