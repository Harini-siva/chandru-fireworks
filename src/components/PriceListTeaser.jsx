import { Link } from 'react-router-dom'
import { TOTAL_ITEMS, PRICE_SECTIONS } from '../data/priceList.js'
import { SHOP } from '../data/shop.js'
import Reveal from './Reveal.jsx'
import Icon from './Icons.jsx'

export default function PriceListTeaser() {
  return (
    <section id="price-list" className="section section--gift pl-teaser">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Price List</span>
          <h2 className="section-title">Our Full Price List</h2>
          <p className="section-lead">{TOTAL_ITEMS} products across {PRICE_SECTIONS.length} categories, with combo offers and festival savings. {SHOP.offer}.</p>
          <div className="btn-row btn-row--center">
            <Link className="btn btn-maroon btn-lg" to="/price-list">View Price List <Icon name="arrow" size={18} /></Link>
            <Link className="btn btn-outline-dark btn-lg" to="/price-list#combo-offers">Combo Offers</Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
