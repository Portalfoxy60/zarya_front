import { Button } from "@chakra-ui/react";
import Menu from "../page_elements/Menu";
import Footer from "../page_elements/Footer";
import "../App.css";

const Subscribe: React.FC = () => {
  return (
    <>
      <Menu />
      <main className="subscribes-container">
        <h1 className="page-title">Подписки</h1>
        <div className="subscribes-grid">
          <div className="subscribe-card">
            <h2 className="subscribe-title">Подписка на неделю</h2>
            <p className="subscribe-text">
              Хочешь просто попробовать или нужен удобный план<br />
              на ближайшие 7 дней?<br />
              Подписка на неделю — это готовые завтраки с доставкой каждый день прямо к вам домой или в офис.<br />
              Минимум забот, максимум вкуса.
            </p>
            <p className="subscribe-price">Цена: 30€</p>
            <Button  width="143px" margin="0 auto"colorPalette="orange" >Оформить</Button>
          </div>

          <div className="subscribe-card">
            <h2 className="subscribe-title">Подписка на месяц (будни)</h2>
            <p className="subscribe-text">
              Начните каждое утро легко и вкусно с нашей подпиской на завтраки!<br />
              В течение месяца вы будете получать свежие, сбалансированные и аппетитные завтраки прямо к вашей двери — с понедельника по пятницу.
            </p>
            <p className="subscribe-price">Цена: 60€</p>
            <Button width="143px" margin="0 auto" colorPalette="orange">Оформить</Button>
          </div>

          <div className="subscribe-card">
            <h2 className="subscribe-title">Подписка на месяц (выходные)</h2>
            <p className="subscribe-text">
              Поздние завтраки, уют и вкусная еда — по выходным.<br />
              Эта подписка создана для тех, кто хочет расслабиться и наслаждаться субботой и воскресеньем без хлопот.<br />
              Мы привозим, ты — наслаждаешься.
            </p>
            <p className="subscribe-price">Цена: 40€</p>
            <Button width="143px" margin="0 auto" colorPalette="orange">Оформить</Button>
          </div>

          <div className="subscribe-card">
            <h2 className="subscribe-title">Подписка на месяц (каждый день)</h2>
            <p className="subscribe-text">
              Максимальный комфорт — завтраки каждый день без перерывов.<br />
              Сбалансированные, свежие блюда доставляются туда, куда тебе удобно.<br />
              Ты оформляешь подписку, а мы берём всё остальное на себя.<br />
              Чики-пуки, как говорится.
            </p>
            <p className="subscribe-price">Цена: 100€</p>
            <Button width="143px" margin="0 auto" colorPalette="orange">Оформить</Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Subscribe;
