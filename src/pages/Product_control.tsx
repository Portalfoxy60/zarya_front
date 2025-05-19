import {
  Input,
  Button,
  Select,
  Portal,
  createListCollection,
  Textarea,
} from '@chakra-ui/react'
import Menu from '../page_elements/Menu'
import Footer from '../page_elements/Footer'
import '../App.css'
import TrashIcon from '../icons/TrashIcon'
import EditIcon from '../icons/EditIcon'
import api from '../api'
import { Category } from '../interfaces/category.interface'
import { IProduct } from '../interfaces/product.interface'
import { useEffect, useState } from 'react'
import { IProductRequest } from '../interfaces/product-request.interface'

const Product_control: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<IProduct[]>([])
  const [product, setProduct] = useState<IProductRequest>({
    name: '',
    description: '',
    image: null,
    price: 1,
    categoryId: 1,
  })
  const [editingId, setEditingId] = useState<number | null>(null)

  const fetchProducts = async () => {
    try {
      const productsRes = await api.get<IProduct[]>('/products')
      setProducts(productsRes.data)
      console.log(products)
    } catch (error) {
      console.error('Ошибка загрузки данных:', error)
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await api.get<Category[]>('/categories')
      setCategories(res.data)
      console.log(categories)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    Object.entries(product).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value instanceof File ? value : String(value))
      }
    })

    try {
      const res = await api.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setProducts((prev) => [...prev, res.data])
      setProduct({
        name: '',
        description: '',
        image: null,
        price: 1,
        categoryId: 1,
      })
    } catch (error) {
      console.error('Ошибка при добавлении продукта:', error)
    }
  }

  const handleEdit = (product: IProduct) => {
    setEditingId(product.id)
    setProduct({
      name: product.name,
      description: product.description,
      image: null,
      price: product.price,
      categoryId: product.category.id,
    })
  }

  const handleUpdate = async () => {
    if (!editingId) return
    const formData = new FormData()
    Object.entries(product).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value instanceof File ? value : String(value))
      }
    })
    try {
      await api.patch(`/products/${editingId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      await fetchProducts()
      setEditingId(null)
      setProduct({
        name: '',
        description: '',
        image: null,
        price: 1,
        categoryId: 1,
      })
    } catch (error) {
      console.error('Ошибка при обновлении продукта:', error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/products/${id}`)
      setProducts((prev) => prev.filter((p) => p.id !== id))
    } catch (error) {
      console.error('Ошибка при удалении продукта:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  // const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setProduct({ ...product, categoryId: Number(e.target.value) })
  // }

  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProduct((prev) => ({
        ...prev,
        image: e.target.files![0],
      }))
    }
  }

  useEffect(() => {
    fetchCategories()
    fetchProducts()
  }, [])

  const categoryCollection = createListCollection({
    items: categories.map((item) => ({
      label: item.name,
      value: item.id.toString(),
    })),
  })

  return (
    <>
      <Menu />
      <main className="subscribe-page">
        <div className="title-wrapper">
          <h1 className="page-title">Управление товарами</h1>
        </div>

        <div className="subscribe-layout">
          <div style={{ flex: 1 }}>
            {products.map((product) => (
              <div key={product.id} className="product-list-item">
                <span>
                  <b>{product.name}</b> {product.category.name}
                </span>
                <span>
                  {product.price}
                  <button
                    className="icon-button"
                    title="Удалить"
                    onClick={() => handleDelete(product.id)}
                  >
                    <TrashIcon boxSize={5} />
                  </button>
                  <button
                    className="icon-button"
                    title="Редактировать"
                    onClick={() => handleEdit(product)}
                  >
                    <EditIcon boxSize={5} />
                  </button>
                </span>
              </div>
            ))}
          </div>

          <form
            className="account-form"
            style={{ maxWidth: '400px', padding: '30px' }}
          >
            <fieldset className="form-section">
              <legend className="form-legend">Добавить товар</legend>

              <div>
                <label className="form-control">Название</label>
                <Input
                  name="name"
                  placeholder="Название товара"
                  size="sm"
                  value={product.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="form-control">Изображение</label>
                <Input
                  type="file"
                  size="sm"
                  accept="image/*"
                  onChange={handleChangeFile}
                />
              </div>

              <div>
                <label className="form-control">Описание</label>
                <Textarea
                  name="description"
                  value={product.description}
                  onChange={handleChangeTextarea}
                />
              </div>

              <div>
                <label className="form-control">Цена</label>
                <Input
                  name="price"
                  type="number"
                  value={product.price}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="form-control">Категория</label>
                <Select.Root
                  size="sm"
                  collection={categoryCollection}
                  value={[product.categoryId.toString()]}
                  onValueChange={(details) =>
                    setProduct((prev) => ({
                      ...prev,
                      categoryId: Number(details.value[0]),
                    }))
                  }
                >
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Выбрать категорию" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {categoryCollection.items.map((item) => (
                          <Select.Item key={item.value} item={item}>
                            {item.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              </div>

              {editingId ? (
                <Button
                  type="button"
                  colorPalette="orange"
                  width="full"
                  size="sm"
                  mt="4"
                  onClick={handleUpdate}
                >
                  Сохранить изменения
                </Button>
              ) : (
                <Button
                  type="button"
                  colorPalette="orange"
                  width="full"
                  size="sm"
                  mt="4"
                  onClick={handleCreate}
                >
                  Добавить товар
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingId(null)}
              >
                Отмена
              </Button>
            </fieldset>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Product_control
