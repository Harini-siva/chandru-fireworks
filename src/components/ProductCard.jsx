import Icon from './Icons.jsx'
import Reveal from './Reveal.jsx'
import { productEnquiry } from '../utils/whatsapp.js'
import { describeProduct } from '../data/productCopy.js'

// Numbered text card: position, English name, original (transliterated) name, short description, WhatsApp enquiry.
export default function ProductCard({ product, index = 0, view = 'grid', delay = 0 }) {
  const showOriginal = product.originalName && product.originalName !== product.name
  return (
    <Reveal className="pcard-wrap" delay={delay}>
      <article className={`pcard ${view === 'list' ? 'pcard--list' : ''}`}>
        <div className="pcard-head">
          <span className="pnum">{String(index + 1).padStart(2, '0')}</span>
          <h3 className="pcard-name">{product.name}</h3>
          {showOriginal && <p className="pcard-orig">{product.originalName}</p>}
        </div>
        <div className="pcard-copy">
          <span className="pcard-rule" aria-hidden="true" />
          <p className="pcard-desc">{describeProduct(product)}</p>
        </div>
        <a className="pcard-cta" href={productEnquiry(product.name)} target="_blank" rel="noopener noreferrer" aria-label={`Enquire about ${product.name} on WhatsApp`}>
          <Icon name="whatsapp" size={24} />
          <span>Enquire Now</span>
          <i className="pcard-cta-go" aria-hidden="true"><Icon name="arrow" size={18} /></i>
        </a>
      </article>
    </Reveal>
  )
}
