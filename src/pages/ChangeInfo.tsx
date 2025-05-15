import { Input, Button, Stack, NumberInput } from '@chakra-ui/react'
import Menu from '../page_elements/Menu'
import Footer from '../page_elements/Footer'
import '../App.css'

const ChangeInfo: React.FC = () => {
  return (
    <>
      <Menu />
      <main className="account-settings">
        <h1 className="page-title">Изменить информацию</h1>

        <form className="account-form">
          <fieldset className="form-section">
            <legend className="form-legend">Данные аккаунта</legend>
            <div className="form-row">
              <div>
                <label className="form-control">Имя</label>
                <Input placeholder="Имя" />
              </div>
              <div>
                <label className="form-control">Почта</label>
                <Input placeholder="Почта" />
              </div>
            </div>
            <div className="form-row">
              <div>
                <label className="form-control">Фамилия</label>
                <Input placeholder="Фамилия" />
              </div>
              <div>
                <label className="form-control">Пароль</label>
                <Input placeholder="Пароль" type="password" />
              </div>
            </div>
            <div className="form-row">
              <div>
                <label className="form-control">Телефон</label>
                <Input placeholder="Телефон" />
              </div>
              <div>
                <label className="form-control">Повторите пароль</label>
                <Input placeholder="Повторите пароль" type="password" />
              </div>
            </div>
          </fieldset>

          <fieldset className="form-section">
            <legend className="form-legend">Данные адреса</legend>
            <div className="form-row">
              <div>
                <label className="form-control">Улица</label>
                <Input placeholder="Tallinna mnt. 29" />
              </div>
              <div>
                <label className="form-control">Этаж</label>
                <Stack gap="5" width="100%">
                  <NumberInput.Root size="sm" defaultValue="3">
                    <NumberInput.Control />
                    <NumberInput.Input />
                  </NumberInput.Root>
                </Stack>
              </div>
            </div>
            <div className="form-row">
              <div>
                <label className="form-control">Дом</label>
                <Stack gap="5" width="100%">
                  <NumberInput.Root size="sm" defaultValue="63">
                    <NumberInput.Control />
                    <NumberInput.Input />
                  </NumberInput.Root>
                </Stack>
              </div>
              <div>
                <label className="form-control">Квартира</label>
                <Stack gap="5" width="100%">
                  <NumberInput.Root size="sm" defaultValue="53">
                    <NumberInput.Control />
                    <NumberInput.Input />
                  </NumberInput.Root>
                </Stack>
              </div>
            </div>
          </fieldset>
        </form>
        <Button
          type="submit"
          colorPalette="orange"
          height="40px"
          fontSize="11px"
        >
          Изменить
        </Button>
      </main>
      <Footer />
    </>
  )
}

export default ChangeInfo
