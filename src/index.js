import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import './index.css';
import App from './App.js'; 
import reportWebVitals from './reportWebVitals.js'; 

import { AuthProvider } from './contexts/AuthContext.js';

const root = createRoot(document.getElementById('root')); // Use createRoot from react-dom/client
root.render(
  <React.StrictMode>
   <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
