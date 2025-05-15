import {
  Input,
  Button,
  Stack,
  Select,
  Portal,
  createListCollection,
  Textarea,
} from '@chakra-ui/react'
import { FiTrash2, FiEdit3 } from 'react-icons/fi'
import Menu from '../page_elements/Menu'
import Footer from '../page_elements/Footer'
import '../App.css'
import TrashIcon from '../icons/TrashIcon'

const categories = createListCollection({
  items: [
    { label: 'Сладкие булочки', value: 'sweet' },
    { label: 'Напитки', value: 'drinks' },
    { label: 'Булочки', value: 'buns' },
  ],
})
const categoryOptions = createListCollection({
  items: [
    { label: 'Сладкие булочки', value: 'sweet' },
    { label: 'Напитки', value: 'drinks' },
    { label: 'Булочки', value: 'buns' },
  ],
})
const Product_control: React.FC = () => {
  const products = [
    { name: 'Булочка с маком', category: 'Булочки', price: '3.49€' },
    { name: 'Молоко', category: 'Напитки', price: '0.89€' },
    { name: 'Булочка с корицей', category: 'Сладкие булочки', price: '3.49€' },
  ]

  return (
    <>
      <Menu />
      <main className="subscribe-page">
        <div className="title-wrapper">
          <h1 className="page-title">Управление товарами</h1>
        </div>

        <div className="subscribe-layout">
          <div style={{ flex: 1 }}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-control">Название</label>
                <Input placeholder="Название товара" />
              </div>
              <div className="form-group">
                <label className="form-control">Категория</label>
                <Select.Root size="sm" collection={categoryOptions}>
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Сладкие булочки" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {categoryOptions.items.map((item) => (
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
            </div>
            {products.map((product, index) => (
              <div key={index} className="product-list-item">
                <span>
                  <b>{product.name}</b> {product.category}
                </span>
                <span>
                  {product.price}
                  <Button size="xs" variant="ghost" colorPalette="orange">
                    <TrashIcon boxSize={4} />
                  </Button>{' '}
                  <FiEdit3 />
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
                <Input placeholder="Название товара" size="sm" />
              </div>

              <div>
                <label className="form-control">Изображение</label>
                <Input type="file" size="sm" />
              </div>

              <div>
                <label className="form-control">Описание</label>
                <Textarea placeholder="Описание товара" size="sm" />
              </div>

              <div>
                <label className="form-control">Цена</label>
                <Input placeholder="3.49" size="sm" />
              </div>

              <div>
                <label className="form-control">Категория</label>
                <Select.Root size="sm" collection={categories}>
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
                        {categories.items.map((item) => (
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
                type="submit"
                colorPalette="orange"
                width="full"
                size="sm"
                mt="4"
              >
                Добавить
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
