import logo from '../assets/logo_zarya.png'
import '../App.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-text">JKTV23 | Aleksandr Krijukov</div>
      <div className="footer-logo">
        <img src={logo} alt="LogoZarya" />
      </div>
    </footer>
  )
}
