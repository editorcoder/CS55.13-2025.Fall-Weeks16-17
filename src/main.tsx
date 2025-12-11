// Import React
import { StrictMode } from 'react';
// Import React DOM
import { createRoot } from 'react-dom/client';
// Import App component
import App from './App';
// Import Ionic PWA elements loader
import { defineCustomElements } from '@ionic/pwa-elements/loader';

// Call the element loader before the render call
defineCustomElements(window);

// Get root container element
const container = document.getElementById('root');
// Create React root
const root = createRoot(container!);
// Render app in strict mode
root.render(
  // Wrap app in strict mode for development checks
  <StrictMode>
    // Render main app component
    <App />
  </StrictMode>
);