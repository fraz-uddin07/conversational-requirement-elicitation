// frontend/src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './App';

// Create a root for rendering the app
const root = createRoot(document.getElementById('root'));

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
