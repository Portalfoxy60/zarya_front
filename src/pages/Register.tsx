import { Button, Input } from '@chakra-ui/react'
import Menu from '../page_elements/Menu'
import Footer from '../page_elements/Footer'
import '../App.css'

const Register: React.FC = () => {
  return (
    <>
      <Menu />
      <main className="register-container">
        <form className="register-box">
          <h2 className="form-legend">Создать аккаунт</h2>
          <div className="register-grid">
            <div className="register-column">
              <div className="form-group">
                <label className="form-control" htmlFor="firstName">
                  Имя
                </label>
                <Input id="firstName" placeholder="Имя" />
              </div>
              <div className="form-group">
                <label className="form-control" htmlFor="lastName">
                  Фамилия
                </label>
                <Input id="lastName" placeholder="Фамилия" />
              </div>
              <div className="form-group">
                <label className="form-control" htmlFor="phone">
                  Телефон
                </label>
                <Input id="phone" placeholder="Телефон" />
              </div>
            </div>
            <div className="register-column">
              <div className="form-group">
                <label className="form-control" htmlFor="email">
                  Почта
                </label>
                <Input id="email" placeholder="Почта" />
              </div>
              <div className="form-group">
                <label className="form-control" htmlFor="password">
                  Пароль
                </label>
                <Input id="password" placeholder="Пароль" type="password" />
              </div>
              <div className="form-group">
                <label className="form-control" htmlFor="repeatPassword">
                  Повторите пароль
                </label>
                <Input
                  id="repeatPassword"
                  placeholder="Повторите пароль"
                  type="password"
                />
              </div>
            </div>
          </div>
          <Button
            type="submit"
            colorPalette="orange"
            size="sm"
            fontWeight="bold"
            fontSize="12px"
            width="full"
          >
            Зарегистрироваться
          </Button>
        </form>
      </main>
      <Footer />
    </>
  )
}

export default Register
