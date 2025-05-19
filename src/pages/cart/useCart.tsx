import { useContext } from 'react'
import { ICartContext } from '../../interfaces/cart-context.interface'
import { CartContext } from './CartContext'

export const useCart = (): ICartContext => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useAuth должен использоваться внутри <CartProvider>')
  }
  return context
}
