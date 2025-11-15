import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css'; // Assuming this will contain Tailwind CSS base styles

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);