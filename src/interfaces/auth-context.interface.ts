import { IUser } from './user.interface'

export interface IAuthContext {
  user: IUser | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (user: IUser) => void
  logout: () => void
}
