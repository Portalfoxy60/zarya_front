import { IProduct } from './product.interface'

export interface IProductWithQuantity {
  product: IProduct
  quantity: number
}
