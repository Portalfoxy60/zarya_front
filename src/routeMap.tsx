import { JSX } from 'react';
import HomePage from './pages/HomePage';
import Products from './pages/Products';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Subscribe from './pages/Subscribe';
import ChangeInfo from './pages/ChangeInfo';
import Addresses from './pages/Addresses';
import Subscribe_data from './pages/Subscribe_data';
import Subscribe_data_start from './pages/subscribe_data_start';
import Product_control from './pages/Product_control';
type Route = {
  path: string;
  element: JSX.Element;
};

export const routeMap: Record<string, Route> = {
  home: {
    path: '/',
    element: <HomePage />,
  },
  products:{
    path:'/products',
    element:<Products />,
  },
  login:{
    path:'/login',
    element:<Login />,
  },
  register:{
    path:'/register',
    element:<Register />,
  },
  cart:{
    path:'/cart',
    element:<Cart />,
  },
  subscribe:{
    path:'/subscribe',
    element:<Subscribe />,
  },
  changeInfo:{
    path:'/changeInfo',
    element:<ChangeInfo />,
  },
  addresses:{
    path:'/addresses',
    element:<Addresses />,
  },
  subscribe_data:{
    path:'/subscribe_data',
    element:<Subscribe_data />,
  },
  subscribe_data_start:{
    path:'/subscribe_data_start',
    element:<Subscribe_data_start />,
  },
  product_control:{
    path:'/product_control',
    element:<Product_control />,
  }
};
