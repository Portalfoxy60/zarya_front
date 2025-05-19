import { useContext } from 'react'
import { IAuthContext } from '../interfaces/auth-context.interface'
import { AuthContext } from './AuthContext'

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth должен использоваться внутри <AuthProvider>')
  }
  return context
}
