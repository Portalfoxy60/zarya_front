import {
  Input,
  Button,
  Select,
  Portal,
  createListCollection,
} from '@chakra-ui/react'
import Menu from '../page_elements/Menu'
import Footer from '../page_elements/Footer'
import '../App.css'
import { useEffect, useState } from 'react'
import api from '../api'
import { IProduct } from '../interfaces/product.interface'
import { routeMap } from '../routeMap'
import { useNavigate } from 'react-router-dom'

const deliveryTimes = createListCollection({
  items: [
    { label: '6:00 - 6:15', value: '6:00-6:15' },
    { label: '6:15 - 6:30', value: '6:15-6:30' },
    { label: '6:30 - 6:45', value: '6:30-6:45' },
    { label: '6:45 - 7:00', value: '6:45-7:00' },
    { label: '7:00 - 7:15', value: '7:00-7:15' },
    { label: '7:15 - 7:30', value: '7:15-7:30' },
    { label: '7:30 - 7:45', value: '7:30-7:45' },
    { label: '7:45 - 8:00', value: '7:45-8:00' },
  ],
})

const Subscribe_data: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const navigate = useNavigate()

  const [form, setForm] = useState({
    street: '',
    building: 0,
    flat: 0,
    floor: 0,
    deliveryTime: '',
    drinkId: '',
    product1Id: '',
    product2Id: '',
  })

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [productsRes, subscriptionRes] = await Promise.all([
          api.get<IProduct[]>('/products'),
          api.get('/subscribes/current'),
        ])
        const currentSubscribe = subscriptionRes.data?.[0]

        setProducts(productsRes.data)

        if (
          currentSubscribe &&
          currentSubscribe.drink &&
          currentSubscribe.product1 &&
          currentSubscribe.product2
        ) {
          setForm({
            street: currentSubscribe.street,
            building: currentSubscribe.building,
            flat: currentSubscribe.flat,
            floor: currentSubscribe.floor,
            deliveryTime: currentSubscribe.deliveryTime,
            drinkId: currentSubscribe.drink.id.toString(),
            product1Id: currentSubscribe.product1.id.toString(),
            product2Id: currentSubscribe.product2.id.toString(),
          })
        } else {
          console.warn(
            'currentSubscribe или его продукты не загружены корректно:',
            currentSubscribe,
          )
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных подписки:', error)
      }
    }

    fetchInitialData()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: name === 'street' ? value : Number(value),
    }))
  }

  const productsCollection = createListCollection({
    items: products.map((item) => ({
      label: item.name,
      value: item.id.toString(),
      categoryName: item.category.name,
    })),
  })
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.patch('/subscribes', {
        street: form.street,
        building: Number(form.building),
        flat: Number(form.flat),
        floor: Number(form.floor),
        deliveryTime: form.deliveryTime,
        drinkId: Number(form.drinkId),
        product1Id: Number(form.product1Id),
        product2Id: Number(form.product2Id),
      })
      alert('Подписка успешно обновлена!')
    } catch (err) {
      console.error('Ошибка при обновлении подписки:', err)
      // alert('Ошибка при обновлении подписки')
    }
  }
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const tomorrowStr = tomorrow.toLocaleDateString('ru-RU')


  const handleDelete = async () => {
    const confirm = window.confirm('Вы уверены, что хотите отменить подписку?')
    if (!confirm) return

    try {
      await api.delete('/subscribes')
      alert('Подписка отменена')
      navigate(routeMap.subscribe.path) 
    } catch (err) {
      console.error('Ошибка при отмене подписки:', err)
      alert('Не удалось отменить подписку')
    }
  }

  return (
    <>
      <Menu />
      <main className="subscribe-page">
        <div className="title-wrapper">
          <h1 className="page-title">
            Изменить данные подписки на завтрашний день{' '}
            <span className="date">({tomorrowStr})</span>
          </h1>
        </div>

        <div className="subscribe-layout">
          <form
            className="account-form single-column-form"
            onSubmit={handleSubmit}
          >
            <fieldset className="form-section">
              <legend className="form-legend">Данные доставки</legend>

              <div>
                <label className="form-control">Улица</label>
                <Input
                  name="street"
                  value={form.street}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="form-control">Дом</label>
                <Input
                  type="number"
                  name="building"
                  value={form.building}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="form-control">Этаж</label>
                <Input
                  type="number"
                  name="floor"
                  value={form.floor}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="form-control">Квартира</label>
                <Input
                  type="number"
                  name="flat"
                  value={form.flat}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="form-control">Время доставки</label>
                <Select.Root
                  collection={deliveryTimes}
                  value={[form.deliveryTime]}
                  onValueChange={(details) =>
                    setForm((prev) => ({
                      ...prev,
                      deliveryTime: details.value[0],
                    }))
                  }
                >
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Выбрать время" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {deliveryTimes.items.map((item) => (
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
              <div>
                <label className="form-control">Выбрать напиток</label>
                <Select.Root
                  collection={productsCollection}
                  value={[form.drinkId]}
                  onValueChange={(details) =>
                    setForm((prev) => ({ ...prev, drinkId: details.value[0] }))
                  }
                  size="sm"
                >
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Выбрать напиток" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {productsCollection.items
                          .filter((i) => i.categoryName === 'Напиток')
                          .map((item) => (
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
              <div>
                <label className="form-control">Продукт 1</label>
                <Select.Root
                  collection={productsCollection}
                  value={[form.product1Id]}
                  onValueChange={(details) =>
                    setForm((prev) => ({
                      ...prev,
                      product1Id: details.value[0],
                    }))
                  }
                  size="sm"
                >
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Выбрать продукт" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {productsCollection.items
                          .filter(
                            (i) =>
                              i.categoryName !== 'Напиток' &&
                              i.categoryName !== 'Комбо',
                          )
                          .map((item) => (
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
              <div>
                <label className="form-control">Продукт 2</label>
                <Select.Root
                  collection={productsCollection}
                  value={[form.product2Id]}
                  onValueChange={(details) =>
                    setForm((prev) => ({
                      ...prev,
                      product2Id: details.value[0],
                    }))
                  }
                  size="sm"
                >
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Выбрать продукт" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {productsCollection.items
                          .filter(
                            (i) =>
                              i.categoryName !== 'Напиток' &&
                              i.categoryName !== 'Комбо',
                          )
                          .map((item) => (
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
            </fieldset>
            <Button
              type="submit"
              colorPalette="orange"
              size="sm"
              fontWeight="bold"
              fontSize="12px"
              width="full"
            >
              Изменить
            </Button>
            <Button
              type="submit"
              colorPalette="orange"
              size="sm"
              fontWeight="bold"
              fontSize="12px"
              width="full"
              onClick={handleDelete}
            >
              Отменить подписку
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Subscribe_data
