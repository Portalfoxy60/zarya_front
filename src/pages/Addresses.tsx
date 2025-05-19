import {
  Input,
  Button,
  createListCollection,
  Select,
  Portal,
} from '@chakra-ui/react'
import Menu from '../page_elements/Menu'
import Footer from '../page_elements/Footer'
import '../App.css'
import { useEffect, useState } from 'react'
import { IAddressRequest } from '../interfaces/address-request.interface'
import api from '../api'
import { IAddress } from '../interfaces/address.interface'
import { IProfile } from '../interfaces/profile.interface'
import { useCart } from './cart/useCart'
import { IProductWithQuantity } from '../interfaces/product-with-quanity.interface'
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

const Addresses: React.FC = () => {
  const navigate = useNavigate()
  const { products } = useCart()
  const [address, setAddress] = useState<
    (IAddressRequest | null) & { deliveryTime: string } & {
      products: IProductWithQuantity[]
    }
  >({
    street: '',
    building: 0,
    flat: 0,
    floor: 0,
    deliveryTime: '',
    products: [],
  })
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get<IProfile>('/users/profile')
        setAddress({
          ...res.data.address,
          deliveryTime: deliveryTimes.at(0)?.value as string,
          products: products,
        })
      } catch (error) {
        console.error('Ошибка при загрузке данных пользователя', error)
      }
    }
    fetchProfile()
  }, [])
  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === 'street' ? e.target.value : Number(e.target.value),
    }))
  }
  // const handleChangeSelectString = (
  //   e: React.ChangeEvent<HTMLSelectElement>,
  // ) => {
  //   setAddress({ ...address, [e.target.name]: e.target.value })
  // }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post<IAddress>('/products/order', address)
      navigate(routeMap.products.path)
      alert('Ваш заказ успешно оформлен!')
    } catch (error) {
      console.error('Ошибка данных пользователя:', error)
    }
  }

  return (
    <>
      <Menu />
      <main className="account-settings">
        <h1 className="page-title">Данные доставки</h1>
        <form
          className="account-form single-column-form"
          onSubmit={handleSubmit}
        >
          <fieldset className="form-section">
            <legend className="form-legend">Данные доставки</legend>

            <div className="form-group">
              <label className="form-control">Улица</label>
              <Input
                placeholder="Tallinna mnt."
                name="street"
                value={address.street}
                onChange={handleChangeAddress}
              />
            </div>

            <div className="form-group">
              <label className="form-control">Этаж</label>
              <Input
                type="number"
                name="floor"
                value={address.floor}
                onChange={handleChangeAddress}
              />
            </div>

            <div className="form-group">
              <label className="form-control">Дом</label>
              <Input
                type="number"
                name="building"
                value={address.building}
                onChange={handleChangeAddress}
              />
            </div>

            <div className="form-group">
              <label className="form-control">Квартира</label>
              <Input
                type="number"
                name="flat"
                value={address.flat}
                onChange={handleChangeAddress}
              />
            </div>
            <div>
              <label className="form-control">
                Время доставки на следующий день
              </label>
              <Select.Root
                size="sm"
                collection={deliveryTimes}
                value={[address.deliveryTime]}
                onValueChange={(details) =>
                  setAddress((prev) => ({
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
          </fieldset>

          <Button
            type="submit"
            colorPalette="orange"
            height="40px"
            fontSize="11px"
          >
            Заказать
          </Button>
        </form>
      </main>
      <Footer />
    </>
  )
}

export default Addresses
