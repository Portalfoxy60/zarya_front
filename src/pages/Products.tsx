import Menu from '../page_elements/Menu'
import Footer from '../page_elements/Footer'
import { Button } from '@chakra-ui/react'
import '../App.css'
import bulka from '../assets/bulohcka_kruglenis.png'

const Products: React.FC = () => {
  return (
    <>
      <Menu />
      <main className="products-page">
        <nav className="category-nav">
          <a href="#buns">Булочки</a>
          <a href="#drinks">Напитки</a>
          <a href="#combo">Комбо</a>
        </nav>

        <section className="product-category" id="buns">
          <h2>Булочки</h2>
          <div className="product-grid">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div className="product-card" key={`bun-${i}`}>
                  <img src={bulka} alt="Булочка" />
                  <h3 className="item-title">Булочка с чем-то</h3>
                  <p className="text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <strong>3.99€</strong>
                  <Button size="sm" colorPalette="orange">
                    Заказать
                  </Button>
                </div>
              ))}
          </div>
        </section>

        <section className="product-category" id="drinks">
          <h2>Напитки</h2>
          <div className="product-grid">
            <div className="product-card">
              <img src={bulka} alt="Молоко" />
              <h3 className="item-title">Молоко</h3>
              <p className="text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <strong>0.89€</strong>
              <Button size="sm" colorPalette="orange">
                Заказать
              </Button>
            </div>
          </div>
        </section>

        <section className="product-category" id="combo">
          <h2>Комбо</h2>
          <div className="product-grid">
            {Array(2)
              .fill(0)
              .map((_, i) => (
                <div className="product-card" key={`combo-${i}`}>
                  <img src={bulka} alt="Комбо" />
                  <h3 className="item-title">Комбо-название</h3>
                  <p className="text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <strong>4.19€</strong>
                  <Button size="sm" colorPalette="orange">
                    Заказать
                  </Button>
                </div>
              ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Products
