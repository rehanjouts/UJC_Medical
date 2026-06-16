import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import ContactPage from './pages/ContactPage.tsx'
import TeamPage from './pages/TeamPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/unser-team" element={<TeamPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
