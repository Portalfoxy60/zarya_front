import { PropsWithChildren, useEffect, useState } from 'react'
import { CartContext } from './CartContext'
import { IProduct } from '../../interfaces/product.interface'
import { IProductWithQuantity } from '../../interfaces/product-with-quanity.interface'

export const CartProvider = ({ children }: PropsWithChildren) => {
  const getTotalQuantity = (): number => {
    return products.reduce((total, item) => total + item.quantity, 0)
  }
  const [products, setProducts] = useState<IProductWithQuantity[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const quantity = getTotalQuantity()
  const addProduct = (product: IProduct) => {
    setProducts((prevProducts) => {
      const existingProduct = prevProducts.find(
        (p) => p.product.id === product.id,
      )

      if (existingProduct) {
        return prevProducts.map((p) =>
          p.product.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
        )
      } else {
        return [...prevProducts, { product, quantity: 1 }]
      }
    })
  }
  const incrementQuantity = (productId: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.product.id === productId ? { ...p, quantity: p.quantity + 1 } : p,
      ),
    )
  }
  const decrementQuantity = (productId: number) => {
    setProducts((prevProducts) =>
      prevProducts
        .map((p) =>
          p.product.id === productId ? { ...p, quantity: p.quantity - 1 } : p,
        )
        .filter((p) => p.quantity > 0),
    )
  }
  const removeProduct = (productId: number) => {
    setProducts((prevProducts) =>
      prevProducts.filter((p) => p.product.id !== productId),
    )
  }

  const getTotalPrice = (): number => {
    return products.reduce((total, item) => {
      const price = item.product.price
      return total + price * item.quantity
    }, 0)
  }
  useEffect(() => {
    setTotalPrice(getTotalPrice())
  }, [products])
  return (
    <CartContext.Provider
      value={{
        products,
        addProduct,
        quantity,
        decrementQuantity,
        incrementQuantity,
        removeProduct,
        totalPrice: Math.round(totalPrice * 100) / 100,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
