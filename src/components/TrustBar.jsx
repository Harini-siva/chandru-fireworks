import { CATEGORIES } from '../data/categories.js'
import { CATALOG } from '../data/catalog.js'
import Icon from './Icons.jsx'
import Reveal from './Reveal.jsx'

const ITEMS = [
  { icon: 'burst', title: `${CATEGORIES.length} Categories`, text: `${CATALOG.length} products to explore` },
  { icon: 'shield', title: 'Pandyan Crackers (Singam)', text: 'Direct seller' },
  { icon: 'lamp', title: '30% – 35% Discount', text: 'Visit 10 days before Diwali' },
  { icon: 'clock', title: 'Open 24/7', text: 'Shop at Naduveerapattu, Cuddalore' },
]

export default function TrustBar() {
  return (
    <section className="trust" aria-label="Highlights">
      <div className="container trust-grid">
        {ITEMS.map((it, i) => (
          <Reveal key={it.title} className="trust-item" delay={i * 90}>
            <span className="trust-icon"><Icon name={it.icon} size={22} /></span>
            <span><strong>{it.title}</strong><small>{it.text}</small></span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
