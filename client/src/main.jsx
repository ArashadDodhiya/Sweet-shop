import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ from 'react-dom/client' not 'react-dom'
import App from './App';
import axios from 'axios';

// Set base URL for API calls
axios.defaults.baseURL = 'http://localhost:5000';

// Use createRoot for React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
