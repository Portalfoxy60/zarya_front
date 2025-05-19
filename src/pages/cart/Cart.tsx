import {
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
import '../../App.css'
import TrashIcon from '../../icons/TrashIcon'
import Footer from '../../page_elements/Footer'
import Menu from '../../page_elements/Menu'
import { IProductWithQuantity } from '../../interfaces/product-with-quanity.interface'
import { useCart } from './useCart'
import { Link } from 'react-router-dom'
const borderStyle = '2px solid #C9BD9C'

const Cart: React.FC = () => {
  const {
    products,
    decrementQuantity,
    incrementQuantity,
    totalPrice,
    removeProduct,
    quantity,
  } = useCart()
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
              {products.map((value: IProductWithQuantity) => {
                return (
                  <TableRow>
                    <TableCell style={{ border: borderStyle }}>
                      {value.product.name}
                    </TableCell>
                    <TableCell style={{ border: borderStyle }}>
                      {value.product.price}€
                    </TableCell>
                    <TableCell style={{ border: borderStyle }}>
                      <Flex className="quantity-controls">
                        <Button
                          size="xs"
                          colorPalette="orange"
                          onClick={() => decrementQuantity(value.product.id)}
                        >
                          -
                        </Button>
                        <Text>x{value.quantity}</Text>
                        <Button
                          size="xs"
                          colorPalette="orange"
                          onClick={() => incrementQuantity(value.product.id)}
                        >
                          +
                        </Button>
                      </Flex>
                    </TableCell>
                    <TableCell style={{ border: borderStyle }}>
                      <Button
                        size="xs"
                        variant="ghost"
                        colorPalette="orange"
                        onClick={() => removeProduct(value.product.id)}
                      >
                        <TrashIcon boxSize={4} />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </TableRoot>
        </Box>
        <Box className="cart-summary">
          <Text>
            <strong>Итого: {totalPrice}€</strong>
          </Text>
          <Button colorPalette="orange" size="md" disabled={quantity === 0}>
            <Link to="/addresses">Заказать все</Link>
          </Button>
        </Box>
      </main>
      <Footer />
    </>
  )
}

export default Cart
