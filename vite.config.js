import {defineConfig} from 'vite'
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
        hmr: true,
        proxy: {
            "/dataAdminApi": {
                target: 'https://66c05df1ba6f27ca9a5668c7.mockapi.io/dataAdminApi',
                changeOrigin: true,
                // secure: false,
                logLevel: 'info',
                rewrite: (path) => {
                    console.log(path.replace(/^\/dataAdminApi/, ''))
                    return path.replace(/^\/dataAdminApi/, '')
                }
            }
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
})
