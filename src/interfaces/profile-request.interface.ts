import { IAddress } from "./address.interface"

export interface IProfileRequest {
    firstname: string
    lastname: string
    email: string
    phone: string
    password: string
    confirmPassword: string
    address: IAddress
}