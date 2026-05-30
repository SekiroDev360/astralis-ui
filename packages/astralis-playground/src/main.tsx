import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "astralis-ui/styles.css";
import { AstralisProvider } from "astralis-ui";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AstralisProvider tokens={{ primaryColor: "#22c55e" }}>
      <App />
    </AstralisProvider>
  </StrictMode>,
)
