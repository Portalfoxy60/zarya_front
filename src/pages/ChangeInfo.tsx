import { Input, Button } from '@chakra-ui/react'
import Menu from '../page_elements/Menu'
import Footer from '../page_elements/Footer'
import '../App.css'
import { useEffect, useState } from 'react'
import api from '../api'
import { IProfile } from '../interfaces/profile.interface'
import { IProfileRequest } from '../interfaces/profile-request.interface'
import { routeMap } from '../routeMap'
import { useNavigate } from 'react-router-dom'

const ChangeInfo: React.FC = () => {
  const navigate = useNavigate()
  const [profile, setProfile] = useState<IProfileRequest>({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: {
      street: '',
      building: 0,
      flat: 0,
      floor: 0,
    },
  })

  const fetchProfile = async () => {
    try {
      const res = await api.get<IProfile>('/users/profile')
      const profile: IProfileRequest = {
        ...res.data,
        password: '',
        confirmPassword: '',
      }
      setProfile(profile)
    } catch (error) {
      console.error('Ошибка данных пользователя:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.patch<IProfileRequest>('/users', profile)
      navigate(routeMap.products.path)
      alert('Данные успешно изменены!')
    } catch (error) {
      console.error('Ошибка данных пользователя:', error)
    }
  }

  const handleChangeProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [e.target.name]:
          e.target.name === 'street' ? e.target.value : Number(e.target.value),
      },
    }))
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  return (
    <>
      <Menu />
      <main className="account-settings">
        <h1 className="page-title">Изменить информацию</h1>

        <form className="account-form" onSubmit={handleSubmit}>
          <fieldset className="form-section">
            <legend className="form-legend">Данные аккаунта</legend>
            <div className="form-row">
              <div>
                <label className="form-control">Имя</label>
                <Input
                  placeholder="Имя"
                  name="firstname"
                  value={profile.firstname}
                  onChange={handleChangeProfile}
                />
              </div>
              <div>
                <label className="form-control">Почта</label>
                <Input
                  placeholder="Почта"
                  name="email"
                  value={profile.email}
                  onChange={handleChangeProfile}
                />
              </div>
            </div>
            <div className="form-row">
              <div>
                <label className="form-control">Фамилия</label>
                <Input
                  placeholder="Фамилия"
                  name="lastname"
                  value={profile.lastname}
                  onChange={handleChangeProfile}
                />
              </div>
              <div>
                <label className="form-control">Пароль</label>
                <Input
                  placeholder="Пароль"
                  type="password"
                  name="password"
                  value={profile.password}
                  onChange={handleChangeProfile}
                />
              </div>
            </div>
            <div className="form-row">
              <div>
                <label className="form-control">Телефон</label>
                <Input
                  placeholder="Телефон"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChangeProfile}
                />
              </div>
              <div>
                <label className="form-control">Повторите пароль</label>
                <Input
                  placeholder="Повторите пароль"
                  type="password"
                  name="confirmPassword"
                  value={profile.confirmPassword}
                  onChange={handleChangeProfile}
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="form-section">
            <legend className="form-legend">Данные адреса</legend>
            <div className="form-row">
              <div>
                <label className="form-control">Улица</label>
                <Input
                  placeholder="Tallinna mnt. 29"
                  name="street"
                  value={profile.address?.street}
                  onChange={handleChangeAddress}
                />
              </div>
              <div>
                <label className="form-control">Этаж</label>
                <Input
                  placeholder="Tallinna mnt. 29"
                  type="number"
                  name="floor"
                  value={profile.address?.floor}
                  onChange={handleChangeAddress}
                />
              </div>
            </div>
            <div className="form-row">
              <div>
                <label className="form-control">Дом</label>
                <Input
                  placeholder="Tallinna mnt. 29"
                  type="number"
                  name="building"
                  value={profile.address?.building}
                  onChange={handleChangeAddress}
                />
              </div>
              <div>
                <label className="form-control">Квартира</label>
                <Input
                  placeholder="Tallinna mnt. 29"
                  type="number"
                  name="flat"
                  value={profile.address?.flat}
                  onChange={handleChangeAddress}
                />
              </div>
            </div>
          </fieldset>
          <Button
            type="submit"
            colorPalette="orange"
            height="40px"
            fontSize="11px"
          >
            Изменить
          </Button>
        </form>
      </main>
      <Footer />
    </>
  )
}

export default ChangeInfo
