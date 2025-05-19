import { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/react'
import Menu from '../page_elements/Menu'
import Footer from '../page_elements/Footer'
import '../App.css'
import api from '../api'
import { IProduct } from '../interfaces/product.interface'
import { useCart } from './cart/useCart'

const Products: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(true)
  const { addProduct } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get<IProduct[]>('/products')
        console.log('Загруженные продукты:', response.data)
        setProducts(response.data)
      } catch (error) {
        console.error('Ошибка при загрузке продуктов:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const getUniqueCategories = (): string[] => {
    const names = products
      .map((p) => p.category?.name)
      .filter((name): name is string => !!name)
    return Array.from(new Set(names))
  }
  const addToCart = (product: IProduct) => {
    addProduct(product)
  }
  const renderCategorySection = (categoryName: string) => {
    const filtered = products.filter(
      (product) => product.category?.name === categoryName,
    )

    return (
      <section
        className="product-category"
        id={categoryName}
        key={categoryName}
      >
        <h2>{categoryName}</h2>
        <div className="product-grid">
          {filtered.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={`http://localhost:3000/static/${product.image}`}
                alt={product.name}
              />
              <h3 className="item-title">{product.name}</h3>
              <p className="text">{product.description}</p>
              <strong>{Number(product.price).toFixed(2)}€</strong>
              <Button
                size="sm"
                colorPalette="orange"
                onClick={() => {
                  addToCart(product)
                }}
              >
                Заказать
              </Button>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (loading) {
    return (
      <>
        <Menu />
        <main className="products-page">
          <p style={{ padding: '2rem', textAlign: 'center' }}>Загрузка...</p>
        </main>
        <Footer />
      </>
    )
  }

  const categories = getUniqueCategories()

  return (
    <>
      <Menu />
      <main className="products-page">
        <nav className="category-nav">
          {categories.map((category) => (
            <a href={`#${category}`} key={category}>
              {category}
            </a>
          ))}
        </nav>

        {categories.map((category) => renderCategorySection(category))}
      </main>
      <Footer />
    </>
  )
}

export default Products
