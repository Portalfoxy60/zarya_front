import { Category } from './category.interface'
export interface IProduct {
  id: number
  name: string
  description: string
  image: string
  price: number
  category: Category
}
