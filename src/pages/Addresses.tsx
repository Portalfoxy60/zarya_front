import { Input, Button, Stack, NumberInput } from '@chakra-ui/react'
import Menu from '../page_elements/Menu'
import Footer from '../page_elements/Footer'
import '../App.css'

const Addresses: React.FC = () => {
  return (
    <>
      <Menu />
      <main className="account-settings">
        <h1 className="page-title">Данные доставки</h1>
        <form className="account-form single-column-form">
          <fieldset className="form-section">
            <legend className="form-legend">Данные доставки</legend>
            <div className="form-group">
              <label className="form-control">Улица</label>
              <Input placeholder="Tallinna mnt." />
            </div>

            <div className="form-group">
              <label className="form-control">Этаж</label>
              <Stack gap="5" width="100%">
                <NumberInput.Root size="sm" defaultValue="3">
                  <NumberInput.Control />
                  <NumberInput.Input />
                </NumberInput.Root>
              </Stack>
            </div>

            <div className="form-group">
              <label className="form-control">Дом</label>
              <Stack gap="5" width="100%">
                <NumberInput.Root size="sm" defaultValue="63">
                  <NumberInput.Control />
                  <NumberInput.Input />
                </NumberInput.Root>
              </Stack>
            </div>

            <div className="form-group">
              <label className="form-control">Квартира</label>
              <Stack gap="5" width="100%">
                <NumberInput.Root size="sm" defaultValue="53">
                  <NumberInput.Control />
                  <NumberInput.Input />
                </NumberInput.Root>
              </Stack>
            </div>

            <div className="form-group">
              <label className="form-control">Время доставки</label>
              <Stack gap="5" width="100%">
                <NumberInput.Root size="sm" defaultValue="6.00">
                  <NumberInput.Control />
                  <NumberInput.Input />
                </NumberInput.Root>
              </Stack>
            </div>
          </fieldset>
        </form>
        <Button
          type="submit"
          colorPalette="orange"
          height="40px"
          fontSize="11px"
        >
          Заказать
        </Button>
      </main>
      <Footer />
    </>
  )
}

export default Addresses
