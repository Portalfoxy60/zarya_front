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

const Product_control: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<IProduct[]>([])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    price: 1,
    categoryId: 1,
  })
  const [editingId, setEditingId] = useState<number | null>(null)

  const fetchData = async () => {
    try {
      const productsRes = await api.get<IProduct[]>('/products')
      setProducts(productsRes.data)
      console.log(products)
    } catch (error) {
      console.error('Ошибка загрузки данных:', error)
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
  // const handleAddProduct = async () => {
  //   if (!newProductName.trim()) return
  //   try {
  //     const res = await api.post('/products', formData)
  //     // setProducts((prev) => [...prev, res.data])
  //     // setNewProductName('')
  //     // setIsAdding(false)
  //   } catch (error) {
  //     console.error('Ошибка при добавлении продукта:', error)
  //   }
  // }
  const handleEdit = (product: IProduct) => {
    setEditingId(product.id)
    setFormData({
      name: product.name,
      description: product.description,
      image: product.image  ?? '',
      price: product.price,
      categoryId: product.category.id,
    })
  }
  const handleUpdateProduct = async () => {
    if (!editingId) return

    try {
      await api.patch(`/products/${editingId}`, formData)

      await fetchData()

      setEditingId(null)
      setFormData({
        name: '',
        description: '',
        image: '',
        price: 1,
        categoryId: 1,
      })
    } catch (error) {
      console.error('Ошибка при обновлении продукта:', error)
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    fetchCategories()
    fetchData()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await api.get<Category[]>('/categories')
      setCategories(res.data)
      console.log(categories)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }
  const categoryCollection = createListCollection({
    items: categories.map((item) => ({
      label: item.name,
      value: item.id,
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
                  placeholder="Название товара"
                  size="sm"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="form-control">Изображение</label>
                <Input
                  type="file"
                  size="sm"
                  onChange={handleChange}
                  value={formData.image}
                />
              </div>

              <div>
                <label className="form-control">Описание</label>
                <Textarea
                  placeholder="Описание товара"
                  size="sm"
                  value={formData.description}
                  onChange={handleChangeTextarea}
                />
              </div>

              <div>
                <label className="form-control">Цена</label>
                <Input
                  placeholder="3.49"
                  size="sm"
                  onChange={handleChange}
                  value={formData.price}
                />
              </div>

              <div>
                <label className="form-control">Категория</label>
                <Select.Root size="sm" collection={categoryCollection}>
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

              <Button
                type="button"
                colorPalette="orange"
                width="full"
                size="sm"
                mt="4"
                onClick={handleUpdateProduct}
              >
                {editingId ? 'Сохранить изменения' : 'Добавить товар'}
              </Button>

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
