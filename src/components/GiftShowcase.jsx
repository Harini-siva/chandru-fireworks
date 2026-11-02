import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { productsInCategory } from '../data/catalog.js'
import { productEnquiry } from '../utils/whatsapp.js'
import { resolveImage } from '../utils/media.js'
import { describeProduct } from '../data/productCopy.js'
import Reveal from './Reveal.jsx'
import Icon from './Icons.jsx'

/* Subtle 3D tilt that follows the pointer. Disabled on touch devices and for reduced motion. */
function Tilt({ children, className }) {
  const ref = useRef(null)
  const fine = () => matchMedia('(hover: hover) and (pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches
  const move = (e) => {
    if (!fine()) return
    const el = ref.current, r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--ry', `${x * 12}deg`)
    el.style.setProperty('--rx', `${-y * 10}deg`)
  }
  const leave = () => { ref.current.style.setProperty('--ry', '0deg'); ref.current.style.setProperty('--rx', '0deg') }
  return <div ref={ref} className={className} onPointerMove={move} onPointerLeave={leave}>{children}</div>
}

export default function GiftShowcase() {
  const boxes = productsInCategory('pandiyan-gift-box')
  if (!boxes.length) return null
  return (
    <section id="gift-boxes" className="section section--gift">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Gift Box Showcase</span>
          <h2 className="section-title">Ready-to-Gift Fireworks Boxes</h2>
          <p className="section-lead">Specially packed boxes with a selection of fireworks, a convenient pick for festive celebrations and gifting.</p>
        </Reveal>
        <div className="gift-grid">
          {boxes.map((p, i) => {
            const count = p.name.match(/\d+/)?.[0]
            const photo = resolveImage(`/assets/Gift Boxes/${count}.jpg`)
            return (
              <Reveal key={p.id} delay={(i % 4) * 110} className="gift-wrap">
                <Tilt className="gift">
                  <div className="gift-photo">
                    {photo && <img src={photo} alt={`${p.name}: ${count} assorted fireworks in a festive box`} loading="lazy" decoding="async" width="1024" height="1024" />}
                    <span className="gift-badge"><b>{count}</b> Items</span>
                    <span className="gift-shine" aria-hidden="true" />
                  </div>
                  <div className="gift-body">
                    <h3>{p.name}</h3>
                    <p>{describeProduct(p)}</p>
                    <a className="btn btn-wa btn-sm" href={productEnquiry(p.name)} target="_blank" rel="noopener noreferrer">
                      <Icon name="whatsapp" size={18} /> 
                    </a>
                  </div>
                </Tilt>
              </Reveal>
            )
          })}
        </div>
        <Reveal className="center">
          <Link className="btn btn-maroon" to="/category/pandiyan-gift-box">View all gift boxes <Icon name="arrow" size={18} /></Link>
        </Reveal>
      </div>
    </section>
  )
}
