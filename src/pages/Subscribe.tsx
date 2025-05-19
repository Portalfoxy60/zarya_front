import { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/react'
import Menu from '../page_elements/Menu'
import Footer from '../page_elements/Footer'
import '../App.css'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { routeMap } from '../routeMap'

interface ISubscribeDetail {
  title: string
  description: string
  price: number
}

const Subscribe: React.FC = () => {
  const [details, setDetails] = useState<Record<string, ISubscribeDetail>>({})
  const navigate = useNavigate()
  const checkSubscribe = async () => {
    try {
      const res = await api.get('/subscribes/current')
      if (Array.isArray(res.data) && res.data.length > 0) {
        navigate(routeMap.subscribe_data.path)
      }
    } catch {
      console.error('Ошибка подписок')
    }
  }

  useEffect(() => {
    checkSubscribe()
    const fetchDetails = async () => {
      try {
        const res = await api.get('/subscribes/details')
        console.log('res.data:', res.data)

        setDetails(res.data)
      } catch (err) {
        console.error('Ошибка при загрузке данных подписки:', err)
      }
    }
    fetchDetails()
  }, [])

  return (
    <>
      <Menu />
      <main className="subscribes-container">
        <h1 className="page-title">Подписки</h1>
        <div className="subscribes-grid">
          {Object.entries(details).map(([key, detail]) => (
            <div className="subscribe-card" key={key}>
              <h2 className="subscribe-title">{detail.title}</h2>
              <p className="subscribe-text">{detail.description}</p>
              <p className="subscribe-price">Цена: {detail.price}€</p>
              <Button
                width="143px"
                margin="0 auto"
                colorPalette="orange"
                onClick={() => navigate(`/subscribe_data_start/${key}`)}
              >
                Оформить
              </Button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Subscribe
