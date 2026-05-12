import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowseRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
  <BrowseRouter>
  <App/>
  </BrowseRouter>
</React.StrictMode>
)
