import {
  Input,
  Button,
  NumberInput,
  Stack,
  Select,
  Portal,
  createListCollection,
} from '@chakra-ui/react'
import Menu from '../page_elements/Menu'
import Footer from '../page_elements/Footer'
import '../App.css'

const deliveryTimes = createListCollection({
  items: [
    { label: '6:00 - 6:15', value: '6:00-6:15' },
    { label: '6:15 - 6:30', value: '6:15-6:30' },
  ],
})
const cancelOptions = createListCollection({
  items: [
    { label: 'Нет, не отменять', value: 'no' },
    { label: 'Да, отменить', value: 'yes' },
  ],
})
const drinkOptions = createListCollection({
  items: [
    { label: 'Молоко', value: 'milk' },
    { label: 'Сок', value: 'juice' },
  ],
})
const productOptions1 = createListCollection({
  items: [
    { label: 'Булочка с маком', value: 'mak' },
    { label: 'Булочка с корицей', value: 'koritsa' },
  ],
})
const productOptions2 = createListCollection({
  items: [
    { label: 'Булочка с капустой', value: 'kapusta' },
    { label: 'Булочка с мясом', value: 'myaso' },
  ],
})

const Subscribe_data_start: React.FC = () => {
  return (
    <>
      <Menu />
      <main className="subscribe-page">
        <div className="title-wrapper">
          <h1 className="page-title">Оформление подписки</h1>
        </div>

        <div className="subscribe-layout">
          <form className="account-form single-column-form">
            <fieldset className="form-section">
              <legend className="form-legend">Данные доставки</legend>

              <div>
                <label className="form-control">Улица</label>
                <Input placeholder="Улица" />
              </div>

              <div>
                <label className="form-control">Дом</label>
                <Stack gap="5" width="100%">
                  <NumberInput.Root size="sm" defaultValue="28">
                    <NumberInput.Control />
                    <NumberInput.Input />
                  </NumberInput.Root>
                </Stack>
              </div>

              <div>
                <label className="form-control">Этаж</label>
                <Stack gap="5" width="100%">
                  <NumberInput.Root size="sm" defaultValue="8">
                    <NumberInput.Control />
                    <NumberInput.Input />
                  </NumberInput.Root>
                </Stack>
              </div>

              <div>
                <label className="form-control">Квартира</label>
                <Stack gap="5" width="100%">
                  <NumberInput.Root size="sm" defaultValue="80">
                    <NumberInput.Control />
                    <NumberInput.Input />
                  </NumberInput.Root>
                </Stack>
              </div>

              <div>
                <label className="form-control">Время доставки</label>
                <Select.Root size="sm" collection={deliveryTimes}>
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Выбрать время" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {deliveryTimes.items.map((item) => (
                          <Select.Item key={item.value} item={item}>
                            {item.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              </div>

              <div>
                <label className="form-control">
                  Отменить на завтрашний день
                </label>
                <Select.Root size="sm" collection={cancelOptions}>
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Выбрать" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {cancelOptions.items.map((item) => (
                          <Select.Item key={item.value} item={item}>
                            {item.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              </div>

              <div>
                <label className="form-control">Выбрать напиток</label>
                <Select.Root size="sm" collection={drinkOptions}>
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Выбрать напиток" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {drinkOptions.items.map((item) => (
                          <Select.Item key={item.value} item={item}>
                            {item.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              </div>

              <div>
                <label className="form-control">Выбрать продукт(1)</label>
                <Select.Root size="sm" collection={productOptions1}>
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Выбрать продукт" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {productOptions1.items.map((item) => (
                          <Select.Item key={item.value} item={item}>
                            {item.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              </div>

              <div>
                <label className="form-control">Выбрать продукт(2)</label>
                <Select.Root size="sm" collection={productOptions2}>
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Выбрать продукт" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {productOptions2.items.map((item) => (
                          <Select.Item key={item.value} item={item}>
                            {item.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              </div>
            </fieldset>
          </form>

          <div className="subscribe-card_data">
            <h2 className="subscribe-title">
              Подписка на месяц
              <br />
              (будни)
            </h2>
            <p className="subscribe-text">Не активна</p>
            <Button
              type="submit"
              colorPalette="orange"
              size="sm"
              fontWeight="bold"
              fontSize="12px"
              width="full"
            >
              Перейти к оплате
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Subscribe_data_start
