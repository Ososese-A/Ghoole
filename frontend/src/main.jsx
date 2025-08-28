import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StockContextProvider } from './context/stockContext.jsx'
import StockFilterContextProvider from './context/StockFilterContext.jsx'

createRoot(document.getElementById('root')).render(

    <StockContextProvider>
    <StockFilterContextProvider>
        <App />
    </StockFilterContextProvider>
    </StockContextProvider>
)
