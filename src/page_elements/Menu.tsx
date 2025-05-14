import "../App.css";
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo_zarya.png';
import { routeMap } from "../routeMap";
import { useAuth } from "../auth/UseAuth";

interface IProps {}

const Menu: React.FC<IProps> = () => {
  const { user, logout } = useAuth();
  return(
    <header className="menu">
      <a href="/" className="logo">
        <img src={logo} alt="LogoZarya" />
      </a>

      <nav className="nav_menu">
        <Link to={routeMap.home.path}>Главная</Link>
        <Link to={routeMap.products.path}>Продукты</Link>
        <Link to={routeMap.cart.path}>Корзина</Link>
        <Link to={routeMap.subscribe.path}>Подписки</Link>
        {/* <Link to={routeMap.changeInfo.path}>Изменить информацию</Link>
        <Link to={routeMap.addresses.path}>добавить информацию</Link>
        <Link to={routeMap.subscribe_data.path}>subscribe_data</Link>
        <Link to={routeMap.subscribe_data_start.path}>subscribe_data_start</Link>
        <Link to={routeMap.product_control.path}>product_control</Link> */}
        <p>{ user?.email}</p>
      </nav>

      <div className="auth-buttons">
        <Button colorPalette="orange" size="md" variant="outline"><Link to={routeMap.login.path}>Войти</Link></Button>
        <Button colorPalette="orange" size="md" variant="solid"><Link to={routeMap.register.path}>Зарегистрироваться</Link></Button>
      </div>
    </header>
  );
};

export default Menu;
