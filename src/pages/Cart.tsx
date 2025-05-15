import {
  Table,
  TableRoot,
  TableHeader,
  TableBody,
  TableRow,
  TableColumnHeader,
  TableCell,
  Button,
  Box,
  Text,
  Flex,
} from '@chakra-ui/react'
import TrashIcon from '../icons/TrashIcon'
import Menu from '../page_elements/Menu'
import Footer from '../page_elements/Footer'
import '../App.css'

const borderStyle = '2px solid #C9BD9C'

const Cart: React.FC = () => {
  return (
    <>
      <Menu />
      <main className="cart-container">
        <h1 className="page-title">Корзина</h1>

        <Box maxW="804px" w="100%">
          <TableRoot
            variant="outline"
            colorPalette="orange"
            size="md"
            style={{
              borderCollapse: 'collapse',
              width: '100%',
              backgroundColor: '#FFEFC5',
            }}
          >
            <TableHeader
              style={{
                backgroundColor: '#FFEFC5',
              }}
            >
              <TableRow>
                <TableColumnHeader
                  style={{ border: borderStyle, fontWeight: 'bold' }}
                >
                  Название
                </TableColumnHeader>
                <TableColumnHeader
                  style={{ border: borderStyle, fontWeight: 'bold' }}
                >
                  Цена
                </TableColumnHeader>
                <TableColumnHeader
                  style={{ border: borderStyle, fontWeight: 'bold' }}
                >
                  Количество
                </TableColumnHeader>
                <TableColumnHeader
                  style={{ border: borderStyle, fontWeight: 'bold' }}
                >
                  Удалить
                </TableColumnHeader>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell style={{ border: borderStyle }}>
                  Булочка с маком
                </TableCell>
                <TableCell style={{ border: borderStyle }}>3.49€</TableCell>
                <TableCell style={{ border: borderStyle }}>
                  <Flex className="quantity-controls">
                    <Button size="xs" colorPalette="orange">
                      -
                    </Button>
                    <Text>x1</Text>
                    <Button size="xs" colorPalette="orange">
                      +
                    </Button>
                  </Flex>
                </TableCell>
                <TableCell style={{ border: borderStyle }}>
                  <Button size="xs" variant="ghost" colorPalette="orange">
                    <TrashIcon boxSize={4} />
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ border: borderStyle }}>Молоко</TableCell>
                <TableCell style={{ border: borderStyle }}>1.78€</TableCell>
                <TableCell style={{ border: borderStyle }}>
                  <Flex className="quantity-controls">
                    <Button size="xs" colorPalette="orange">
                      -
                    </Button>
                    <Text>x2</Text>
                    <Button size="xs" colorPalette="orange">
                      +
                    </Button>
                  </Flex>
                </TableCell>
                <TableCell style={{ border: borderStyle }}>
                  <Button size="xs" variant="ghost" colorPalette="orange">
                    <TrashIcon boxSize={4} />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </TableRoot>
        </Box>
        <Box className="cart-summary">
          <Text>
            <strong>Итого: 8.75€</strong>
          </Text>
          <Button colorPalette="orange" size="md">
            Заказать все
          </Button>
        </Box>
      </main>
      <Footer />
    </>
  )
}

export default Cart
