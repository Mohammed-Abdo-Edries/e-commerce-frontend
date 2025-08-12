import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthContextProvider } from './Context/AuthContext'
import { ShopContextProvider } from './Context/ShopContext'
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
