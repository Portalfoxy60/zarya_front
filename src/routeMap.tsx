import { JSX } from 'react'
import { ERoles } from './enums/roles.enum'
import HomePage from './pages/HomePage'
import Products from './pages/Products'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import Subscribe from './pages/Subscribe'
import ChangeInfo from './pages/ChangeInfo'
import Addresses from './pages/Addresses'
import Subscribe_data from './pages/Subscribe_data'
import Subscribe_data_start from './pages/Subscribe_data_start'
import Product_control from './pages/Product_control'

type Route = {
  path: string
  element: JSX.Element
  role: ERoles
}

export const routeMap: Record<string, Route> = {
  home: {
    path: '/',
    element: <HomePage />,
    role: ERoles.GUEST,
  },
  products: {
    path: '/products',
    element: <Products />,
    role: ERoles.GUEST,
  },
  login: {
    path: '/login',
    element: <Login />,
    role: ERoles.GUEST,
  },
  register: {
    path: '/register',
    element: <Register />,
    role: ERoles.GUEST,
  },
  cart: {
    path: '/cart',
    element: <Cart />,
    role: ERoles.USER,
  },
  subscribe: {
    path: '/subscribe',
    element: <Subscribe />,
    role: ERoles.USER,
  },
  changeInfo: {
    path: '/changeInfo',
    element: <ChangeInfo />,
    role: ERoles.USER,
  },
  addresses: {
    path: '/addresses',
    element: <Addresses />,
    role: ERoles.USER,
  },
  subscribe_data: {
    path: '/subscribe_data',
    element: <Subscribe_data />,
    role: ERoles.USER,
  },
  subscribe_data_start: {
    path: '/subscribe_data_start',
    element: <Subscribe_data_start />,
    role: ERoles.USER,
  },
  product_control: {
    path: '/product_control',
    element: <Product_control />,
    role: ERoles.ADMIN,
  },
}
