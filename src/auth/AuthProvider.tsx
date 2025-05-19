import { PropsWithChildren, useEffect, useState } from 'react'
import api from '../api'
import axios from 'axios'
import { IUser } from '../interfaces/user.interface'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const login = (userData: IUser) => setUser(userData)
  const logout = async () => {
    await api.post('/auth/logout')
    setUser(null)
  }

  const isAuthenticated = !!user

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await api.get<IUser>('/auth/me')
        login(response.data)
      } catch (error) {
        logout()

        if (axios.isAxiosError(error)) {
          // заменить на красивый вывод ошибки
          console.error(error.response?.data.message || 'Что-то пошло не так')
        } else {
          // заменить на красивый вывод ошибки
          console.error('Неизвестная ошибка')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchMe()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
