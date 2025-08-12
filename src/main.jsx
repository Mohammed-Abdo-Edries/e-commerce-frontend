import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthContextProvider } from './context1/AuthContext'
import { ShopContextProvider } from './context1/ShopContext'
import { CookiesProvider } from 'react-cookie';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
        <CookiesProvider>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
        </CookiesProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
