import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const theme = createTheme({
    palette: {
        primary: {
            main: '#bb86fc', // Lavender/Purple from UI
        },
        secondary: {
            main: '#03dac6',
        },
        background: {
            default: '#ffffff',
        },
    },
    typography: {
        fontFamily: '"Outfit", "Inter", sans-serif',
    },
    shape: {
        borderRadius: 16,
    },
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </React.StrictMode>,
)
