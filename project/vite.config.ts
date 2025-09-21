import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          supabase: ['@supabase/supabase-js'],
          utils: ['lucide-react']
        }
      }
    },
    // Asegurar que el build funcione en Vercel
    target: 'es2015',
    cssCodeSplit: true
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom', 'react-router-dom', '@supabase/supabase-js']
  },
  server: {
    port: 3000,
    host: true
  },
  preview: {
    port: 3000,
    host: true
  },
  // Configuración para evitar errores de módulos en production
  define: {
    global: 'globalThis',
  },
  // Asegurar compatibilidad con Vercel
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
});
