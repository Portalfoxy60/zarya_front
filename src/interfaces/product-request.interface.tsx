export interface IProductRequest {
  name: string
  description: string
  image: File | null
  price: number
  categoryId: number
}
