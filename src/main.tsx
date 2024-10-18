import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const root = document.getElementById('root');

if (root) {
  try {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Error rendering the app:', error);
    root.innerHTML = '<h1>An error occurred while rendering the app. Please check the console for more information.</h1>';
  }
} else {
  console.error('Root element not found');
}

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Uncaught error:', event.error);
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});