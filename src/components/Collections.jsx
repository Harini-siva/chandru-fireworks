import { Link } from 'react-router-dom'
import { COLLECTIONS } from '../data/shop.js'
import Media from './Media.jsx'
import Reveal from './Reveal.jsx'
import Icon from './Icons.jsx'

export default function Collections() {
  return (
    <section id="collections" className="section section--dark">
      <div className="container">
        <Reveal className="section-head section-head--light">
          <span className="eyebrow eyebrow--gold">Celebration Collections</span>
          <h2 className="section-title">Find the Right Celebration</h2>
          <p className="section-lead">Curated sets of categories for every kind of festive moment.</p>
        </Reveal>
        <div className="collections-grid">
          {COLLECTIONS.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 3) * 90} className="collection-wrap">
              <Link to="/#categories" className="collection" aria-label={`${c.title} collection`}>
                <Media src={c.image} kind={c.kind} variant={i} alt="" className="collection-media" />
                <span className="collection-shade" />
                <span className="collection-body">
                  <strong>{c.title}</strong>
                  <small>{c.blurb}</small>
                  <span className="collection-cats">{c.cats.join(' · ')}</span>
                  <span className="collection-go">Explore <Icon name="arrow" size={16} /></span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
