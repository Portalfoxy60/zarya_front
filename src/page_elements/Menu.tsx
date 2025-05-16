import '../App.css'
import { Badge, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo_zarya.png'
import { Route, routeMap } from '../routeMap'
import { useAuth } from '../auth/UseAuth'
import { ERoles } from '../enums/roles.enum'
import { useCart } from '../pages/cart/useCart'
const Menu: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth()
  let links : Route[] = []
  if (user === null) {
    links = [routeMap.home, routeMap.products]
  } else if (user.role === ERoles.USER) {
    links = [routeMap.home, routeMap.products, routeMap.cart, routeMap.subscribe, routeMap.changeInfo]
  } else if ((user.role = ERoles.ADMIN)) {
    links = [routeMap.home, routeMap.products, routeMap.cart, routeMap.subscribe, routeMap.changeInfo, routeMap.category_control, routeMap.product_control]
  }
  const {quantity} = useCart()
  return (
    <header className="menu">
      <a href="/" className="logo">
        <img src={logo} alt="LogoZarya" />
      </a>

      <nav className="nav_menu">
        {links.map(link =>{
          return (
            <>
            <Link to={link.path}>{link.displayName}</Link>
            {link.path === '/cart' ? <Badge colorPalette="orange" size="md">{quantity}</Badge> : <></>}
            </>
          )
        })}
        
      </nav>

      <div className="auth-buttons">
          {!isAuthenticated ? (<><Button colorPalette="orange" size="md" variant="outline">
          <Link to={routeMap.login.path}>Войти</Link>
        </Button>
        <Button colorPalette="orange" size="md" variant="solid">
          <Link to={routeMap.register.path}>Зарегистрироваться</Link>
        </Button></>): (<><p>вы в аккаунте</p><Button colorPalette="orange" size="md" variant="outline" onClick={logout}>Выйти</Button></>)}
      </div>
    </header>
  )
}

export default Menu
