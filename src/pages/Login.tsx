import { Button, Input, Text } from '@chakra-ui/react'
import Menu from '../page_elements/Menu'
import Footer from '../page_elements/Footer'
import '../App.css'
import api from '../api'
import { useEffect, useState } from 'react'
import { useAuth } from '../auth/UseAuth'
import { ILoginCredentials } from '../interfaces/login-credentials.interface'
import { IUser } from '../interfaces/user.interface'
import { useNavigate } from 'react-router-dom'
import { routeMap } from '../routeMap'
import { AxiosError } from 'axios'

const Login: React.FC = () => {
  const { login, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [credentials, setCredentials] = useState<ILoginCredentials>({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await api.post<IUser>('/auth/login', credentials)
      login(response.data)
      navigate(routeMap.products.path)
    } catch (error: unknown) {
      logout()

      const axiosError = error as AxiosError<{ message: string }>
      const message = axiosError.response?.data?.message || 'Ошибка входа'

      console.error('Ошибка логина', message)
      alert(message)
    }
  }

  useEffect(()=>{
    if (isAuthenticated) {
      navigate('/changeInfo')
    }
  },[])

  return (
    <>
      <Menu />
      <main className="login-container">
        <form className="login-box" onSubmit={handleSubmit}>
          <h2 className="form-legend">Войти в аккаунт</h2>
          <div>
            <label className="form-control">Почта</label>
            <Input
              id="email"
              name="email"
              placeholder="Почта"
              value={credentials.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="form-control">Пароль</label>
            <Input
              id="password"
              name="password"
              placeholder="Пароль"
              type="password"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          <Button
            type="submit"
            colorPalette="orange"
            size="sm"
            fontWeight="bold"
            fontSize="12px"
            width="full"
          >
            Войти
          </Button>
          <Text className="login-link">Нет аккаунта? Зарегистрируйтесь!</Text>
        </form>
      </main>
      <Footer />
    </>
  )
}

export default Login
