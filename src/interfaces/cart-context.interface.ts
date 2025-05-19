import { IProduct } from './product.interface'
import { IProductWithQuantity } from './product-with-quanity.interface'

export interface ICartContext {
  products: IProductWithQuantity[]
  quantity: number
  totalPrice: number
  incrementQuantity: (productId: number) => void
  decrementQuantity: (productId: number) => void
  addProduct: (product: IProduct) => void
  removeProduct: (productId: number) => void
}
