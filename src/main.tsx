import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.tsx'
import { Provider } from './components/ui/provider.tsx'
import { AuthProvider } from './auth/AuthProvider.tsx'
import { CartProvider } from './pages/cart/CartProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <Provider>
          <App />
        </Provider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
