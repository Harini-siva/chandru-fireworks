import { Link } from 'react-router-dom'
import { CATEGORIES } from '../data/categories.js'
import { countInCategory } from '../data/catalog.js'
import Media from './Media.jsx'
import Reveal from './Reveal.jsx'
import Icon from './Icons.jsx'
import './Categories.css'

export default function Categories() {
  return (
    <section id="categories" className="categories-section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Explore our collection</span>
          <h2 className="section-title">Shop by Categories</h2>
          <p className="section-lead">Explore our wide range of quality crackers and festive fireworks from Chandru Crackers.</p>
        </Reveal>

        <div className="categories-grid">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 4) * 70} className="category-wrap">
              <Link to={`/category/${c.slug}`} className="category-card" aria-label={`View products: ${c.cat}`}>
                <div className="category-card-image">
                  <Media src={c.image} kind={c.kind} variant={i} alt="" />
                  <span className="category-count">{countInCategory(c.slug)} {countInCategory(c.slug) === 1 ? 'product' : 'products'}</span>
                </div>
                <div className="category-card-content">
                  <h3>{c.cat}</h3>
                  <p>{c.description}</p>
                  <span className="view-products">View Products <Icon name="arrow" size={16} className="arrow" /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
