import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
//import '@progress/kendo-theme-default/dist/all.css'
import '@progress/kendo-theme-bootstrap/dist/all.css'
//import '@progress/kendo-theme-material/dist/all.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
