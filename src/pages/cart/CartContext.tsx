import { createContext } from 'react'
import { ICartContext } from '../../interfaces/cart-context.interface'
export const CartContext = createContext<ICartContext | undefined>(undefined)
