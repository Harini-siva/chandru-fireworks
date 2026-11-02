import { SHOP } from '../data/shop.js'
import { generalEnquiry, mapsLink } from '../utils/whatsapp.js'
import { imagesInFolder } from '../utils/media.js'
import Reveal from './Reveal.jsx'
import Icon from './Icons.jsx'

// A real shop photo placed in src/assets/shop/ is used automatically; otherwise the display photo is shown.
const shopImage = imagesInFolder('shop')[0]?.url ?? '/images/crackers.jpg'

export default function Store() {
  return (
    <section id="visit" className="section section--store">
      <div className="container store-grid">
        <Reveal className="store-photo">
          <img src={shopImage} alt={`${SHOP.name}, ${SHOP.place}`} loading="lazy" decoding="async" />
          <span className="store-badge">{SHOP.hours}</span>
        </Reveal>

        <Reveal className="store-card" delay={120}>
          <span className="eyebrow eyebrow--gold">Visit our store</span>
          <h2 className="section-title">{SHOP.name}</h2>
          <p className="store-tamil">{SHOP.tamil}</p>
          <p className="store-sub">{SHOP.parent}</p>

          <ul className="store-list">
            <li><Icon name="pin" size={20} /><span><b>Address</b>{SHOP.address}</span></li>
            <li>
              <Icon name="phone" size={20} />
              <span><b>Contact</b>{SHOP.phones.map((p, i) => <a key={p} href={`tel:+91${p}`}>{i ? ' · ' : ''}{p}</a>)}</span>
            </li>
            <li><Icon name="clock" size={20} /><span><b>Opening hours</b>{SHOP.hours}</span></li>
          </ul>

          <p className="store-offer">{SHOP.offer}</p>

          <div className="btn-row">
            <a className="btn btn-wa" href={generalEnquiry()} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={20} /> Enquire on WhatsApp</a>
            <a className="btn btn-gold" href={mapsLink()} target="_blank" rel="noopener noreferrer"><Icon name="pin" size={20} /> Google Maps</a>
            <a className="btn btn-glass" href={`tel:+91${SHOP.phones[0]}`}><Icon name="phone" size={20} /> Call</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
