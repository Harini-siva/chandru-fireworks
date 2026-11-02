import { Link } from 'react-router-dom'
import { SHOP, NAV } from '../data/shop.js'
import { CATEGORIES } from '../data/categories.js'
import { generalEnquiry } from '../utils/whatsapp.js'
import Logo from './Logo.jsx'
import Fireworks from './Fireworks.jsx'
import Icon from './Icons.jsx'

const SOCIAL = [['instagram', 'insta', 'Instagram'], ['facebook', 'facebook', 'Facebook'], ['youtube', 'youtube', 'YouTube']]
const GOLDS = ['#f6ce58', '#ffe291', '#fff8e8']

export default function Footer() {
  const social = SOCIAL.filter(([key]) => SHOP.social?.[key])
  return (
    <footer className="footer">
      <Fireworks interval={3200} count={22} colors={GOLDS} />
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo size={92} />
          <h2>{SHOP.name}</h2>
          <p>{SHOP.tamil}</p>
          <p className="footer-tag">{SHOP.tag}</p>
          <a className="btn btn-wa" href={generalEnquiry()} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={20} /> </a>
          {social.length > 0 && (
            <div className="social">
              {social.map(([key, icon, label]) => <a key={key} href={SHOP.social[key]} target="_blank" rel="noopener noreferrer" aria-label={label}><Icon name={icon} size={20} /></a>)}
            </div>
          )}
        </div>

        <nav aria-label="Footer">
          <h3>Navigate</h3>
          <ul>{NAV.map((n) => <li key={n.label}><Link to={n.to}>{n.label}</Link></li>)}</ul>
        </nav>

        <nav aria-label="Popular categories">
          <h3>Categories</h3>
          <ul>
            {CATEGORIES.slice(0, 7).map((c) => <li key={c.slug}><Link to={`/category/${c.slug}`}>{c.cat}</Link></li>)}
          </ul>
        </nav>

        <div>
          <h3>Visit &amp; contact</h3>
          <ul className="footer-contact">
            <li><Icon name="pin" size={18} /><span>{SHOP.address}</span></li>
            {SHOP.phones.map((p) => <li key={p}><Icon name="phone" size={18} /><a href={`tel:+91${p}`}>{p}</a></li>)}
            <li><Icon name="clock" size={18} /><span>{SHOP.hours}</span></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <small>© {new Date().getFullYear()} {SHOP.name}. Please use fireworks responsibly and follow the safety instructions on every product.</small>
        </div>
      </div>
    </footer>
  )
}
