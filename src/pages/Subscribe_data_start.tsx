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
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../api'
import { ISubscribeRequest } from '../interfaces/subscribe-request.interface'
import { IProduct } from '../interfaces/product.interface'
import { IProfile } from '../interfaces/profile.interface'

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

const Subscribe_data_start: React.FC = () => {
  const navigate = useNavigate()
  const { type } = useParams<{ type: string }>()
  const [subscribeDetails, setSubscribesDetails] = useState<{
    title: string
    description: string
    price: string
  }>()
  const [subscribe, setSubscribe] = useState<ISubscribeRequest>({
    type: type || 'week',
    product1Id: 0,
    product2Id: 0,
    drinkId: 0,
    street: '',
    building: 0,
    flat: 0,
    floor: 0,
    deliveryTime: '',
  })
  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    fetchSubscribes()
    fetchProducts()
    fetchProfile()
  }, [])

  const fetchSubscribes = async () => {
    try {
      const res = await api.get('/subscribes/details')
      setSubscribesDetails(res.data[type!])
    } catch (err) {
      console.error('Ошибка при загрузке подписки:', err)
    }
  }

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products/')
      setProducts(res.data)
    } catch (err) {
      console.error('Ошибка при загрузке продуктов:', err)
    }
  }

  const fetchProfile = async () => {
    try {
      const res = await api.get<IProfile>('/users/profile')
      setSubscribe((prev) => ({
        ...prev,
        street: res.data.address?.street || '',
        building: res.data.address?.building || 0,
        flat: res.data.address?.flat || 0,
        floor: res.data.address?.floor || 0,
        deliveryTime: deliveryTimes.items[0]?.value || '',
      }))
    } catch (error) {
      console.error('Ошибка при загрузке адреса:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSubscribe((prev) => ({
      ...prev,
      [name]: name === 'street' ? value : Number(value),
    }))
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post('/subscribes', subscribe)
      alert('Подписка успешно оформлена!')
      navigate('/products')
    } catch (error) {
      console.error('Ошибка при оформлении подписки:', error)
      alert('Произошла ошибка при оформлении подписки.')
    }
  }

  const productsCollection = createListCollection({
    items: products.map((item) => ({
      label: item.name,
      value: item.id.toString(),
      categoryName: item.category.name,
    })),
  })

  return (
    <>
      <Menu />
      <main className="subscribe-page">
        <div className="title-wrapper">
          <h1 className="page-title">Оформление подписки</h1>
        </div>

        <div className="subscribe-layout">
          <form
            className="account-form single-column-form"
            onSubmit={handleCreate}
          >
            <fieldset className="form-section">
              <legend className="form-legend">Данные доставки</legend>

              <Input name="street" placeholder="Улица" value={subscribe.street} onChange={handleChange} />
              <Input name="building" type="number" placeholder="Дом" value={subscribe.building} onChange={handleChange} />
              <Input name="floor" type="number" placeholder="Этаж" value={subscribe.floor} onChange={handleChange} />
              <Input name="flat" type="number" placeholder="Квартира" value={subscribe.flat} onChange={handleChange} />

              <label className="form-control">Время доставки</label>
              <Select.Root
                collection={deliveryTimes}
                value={[subscribe.deliveryTime]}
                onValueChange={(details) =>
                  setSubscribe((prev) => ({ ...prev, deliveryTime: details.value[0] }))
                }
                size="sm"
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

              <label className="form-control">Выбрать напиток</label>
              <Select.Root
                collection={productsCollection}
                value={[subscribe.drinkId.toString()]}
                onValueChange={(details) =>
                  setSubscribe((prev) => ({
                    ...prev,
                    drinkId: Number(details.value[0]),
                  }))
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

              <label className="form-control">Продукт 1</label>
              <Select.Root
                collection={productsCollection}
                value={[subscribe.product1Id.toString()]}
                onValueChange={(details) =>
                  setSubscribe((prev) => ({
                    ...prev,
                    product1Id: Number(details.value[0]),
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
                        .filter((i) => i.categoryName !== 'Напиток' && i.categoryName !== 'Комбо')
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

              <label className="form-control">Продукт 2</label>
              <Select.Root
                collection={productsCollection}
                value={[subscribe.product2Id.toString()]}
                onValueChange={(details) =>
                  setSubscribe((prev) => ({
                    ...prev,
                    product2Id: Number(details.value[0]),
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
                        .filter((i) => i.categoryName !== 'Напиток' && i.categoryName !== 'Комбо')
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
            </fieldset>

            <Button
              type="submit"
              colorPalette="orange"
              size="sm"
              fontWeight="bold"
              fontSize="12px"
              width="full"
            >
              Перейти к оплате
            </Button>
          </form>

          <div className="subscribe-card_data">
            {subscribeDetails ? (
              <>
                <h2 className="subscribe-title">{subscribeDetails.title}</h2>
                <p className="subscribe-text">{subscribeDetails.description}</p>
                <p className="subscribe-price">Цена: {subscribeDetails.price}€</p>
              </>
            ) : (
              <p>Загрузка подписки...</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Subscribe_data_start
