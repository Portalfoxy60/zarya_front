import { JSX } from 'react';
import HomePage from './pages/HomePage';
import Products from './pages/Products';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Subscribe from './pages/Subscribe';
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
  }
};
