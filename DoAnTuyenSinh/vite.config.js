import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        target: 'es2018', // Đảm bảo tương thích với các browser cũ hơn
        outDir: 'dist',
        sourcemap: false,
        minify: 'esbuild',
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    router: ['react-router-dom'],
                    motion: ['framer-motion'],
                    http: ['axios']
                }
            }
        }
    },
    server: {
        port: 5173,
        host: true
    },
    preview: {
        port: 4173,
        host: true
    }
})