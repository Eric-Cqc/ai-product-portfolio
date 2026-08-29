import React from 'react';
import { createRoot } from 'react-dom/client';
import '@/app/globals.css';
import { StaticApp } from '@/static/static-app';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StaticApp />
  </React.StrictMode>,
);
