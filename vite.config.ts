import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carrega variáveis de ambiente baseadas no modo (development/production)
  // O terceiro argumento '' carrega todas as variáveis, não apenas as que começam com VITE_
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Define process.env.API_KEY para ser substituído pelo valor real durante o build/dev
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});