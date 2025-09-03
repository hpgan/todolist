import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppNew from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppNew />
  </StrictMode>,
)

//function Hello() {
//  return <h1>Hello</h1>
//}

//createRoot(document.getElementById('root')).render(<Hello />);

