import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "../css/tailwind.css";
import { UserContextProvider } from './accounts/UserContext.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <UserContextProvider>
        <App />
              </UserContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
