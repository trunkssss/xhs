import React, { Suspense } from 'react';
import ReactDOMClient from 'react-dom/client';
import App from './router';
const container = document.getElementById('root');

if (container) {

  const root = ReactDOMClient.createRoot(container);

  root.render(
    <App />
  );
}