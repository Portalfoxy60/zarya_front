import { IAddress } from "./address.interface"

export interface IProfile {
    firstname: string
    lastname: string
    email: string
    phone: string
    address: IAddress
}