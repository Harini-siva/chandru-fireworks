import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource-variable/manrope'
import '@fontsource-variable/playfair-display'
import '@fontsource/noto-sans-tamil/tamil-400.css'
import '@fontsource/noto-sans-tamil/tamil-600.css'
import '@fontsource/noto-sans-tamil/tamil-700.css'
import App from './App.jsx'
import './styles/index.css'
import './styles/site.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
