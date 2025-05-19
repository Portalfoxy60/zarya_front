import { Button, Input } from '@chakra-ui/react'
import Menu from '../page_elements/Menu'
import Footer from '../page_elements/Footer'
import '../App.css'
import { useState } from 'react'
import api from '../api'
import { useAuth } from '../auth/UseAuth'
import { IUser } from '../interfaces/user.interface'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { routeMap } from '../routeMap'

const Register: React.FC = () => {
  const { login, logout } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post('/auth/register', form)

      const loginResponse = await api.post<IUser>('/auth/login', {
        email: form.email,
        password: form.password,
      })

      login(loginResponse.data)

      navigate(routeMap.products.path)
    } catch (error: unknown) {
      logout()
      const axiosError = error as AxiosError<{ message: string | string[] }>
      const message = Array.isArray(axiosError.response?.data?.message)
        ? axiosError.response?.data?.message.join('\n')
        : axiosError.response?.data?.message || 'Ошибка регистрации'

      console.error('Ошибка регистрации:', message)
      alert(message)
    }
  }

  return (
    <>
      <Menu />
      <main className="register-container">
        <form className="register-box" onSubmit={handleSubmit}>
          <h2 className="form-legend">Создать аккаунт</h2>
          <div className="register-grid">
            <div className="register-column">
              <div className="form-group">
                <label htmlFor="firstname">Имя</label>
                <Input
                  id="firstname"
                  name="firstname"
                  placeholder="Имя"
                  value={form.firstname}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Фамилия</label>
                <Input
                  id="lastname"
                  name="lastname"
                  placeholder="Фамилия"
                  value={form.lastname}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Телефон"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="register-column">
              <div className="form-group">
                <label htmlFor="email">Почта</label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Почта"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Пароль</label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Пароль"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Повторите пароль</label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Повторите пароль"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <Button type="submit" colorPalette="orange" size="sm" width="full">
            Зарегистрироваться
          </Button>
        </form>
      </main>
      <Footer />
    </>
  )
}

export default Register
