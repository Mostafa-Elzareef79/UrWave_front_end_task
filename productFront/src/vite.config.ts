import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
         'primeng/resources': '/node_modules/primeng/resources',
      'primeicons': '/node_modules/primeicons'
    }
  }
});