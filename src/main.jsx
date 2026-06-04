import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

console.log('main.jsx: attempting to mount React')
console.log('main.jsx: root element ->', document.getElementById('root'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)