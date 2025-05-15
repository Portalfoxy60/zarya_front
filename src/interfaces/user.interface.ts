import { ERoles } from '../enums/roles.enum'

export interface IUser {
  id: number
  email: string
  role: ERoles
}
