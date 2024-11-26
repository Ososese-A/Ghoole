import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StockContextProvider } from './context/stockContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StockContextProvider>
    <App />
    </StockContextProvider>
  </StrictMode>,
)