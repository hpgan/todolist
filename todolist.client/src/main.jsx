import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AlertDismissible from './AlertDismissible.jsx'

createRoot(document.getElementById('root')).render(

    <StrictMode>
        <App />
  </StrictMode>,
)

//function Hello() {
//  return <h1>Hello</h1>
//}

//createRoot(document.getElementById('root')).render(<Hello />);

