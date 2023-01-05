import React from 'react';
import AppRoutes from './routes';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root'); // Encontra a div com id root no arquivo index.html
const root = createRoot(container); // Cria um elemento root para o App

root.render( // Renderiza as páginas da aplicação
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>,
);