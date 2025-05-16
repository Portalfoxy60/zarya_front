import Menu from '../page_elements/Menu'
import Footer from '../page_elements/Footer'
import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import '../App.css'
import bulka from '../assets/bulohcka_kruglenis.png'
import { routeMap } from '../routeMap'

const HomePage: React.FC = () => {
  return (
    <>
      <Menu />
      <section className="promo-section">
        <img src={bulka} alt="Булочка" className="promo-image" />
        <div className="promo-overlay" />
        <div className="promo-content">
          <h1 className="promo-title">Вкусные булки – то, что нужно с утра!</h1>
          <Button size="lg" variant="solid" className="start_button">
            <Link to={routeMap.products.path}>Заказать сейчас</Link>
          </Button>
        </div>
      </section>
      <Footer />
    </>
  )
}
export default HomePage
