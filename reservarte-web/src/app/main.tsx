import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '24px', fontWeight: 'bold' }}>
      ¡Hola Mundo!
    </div>
  </React.StrictMode>
);
