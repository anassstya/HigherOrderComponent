import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DateFormat from './Format Publication Date/DateFormat.jsx'
import App from "./MainPage/App.jsx";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
