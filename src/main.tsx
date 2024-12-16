import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import theme from './theme'
import './App.css'
import { StockProvider } from './providers/StockProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StockProvider>
        <App />
      </StockProvider>
    </ThemeProvider>
  </StrictMode>,
)
