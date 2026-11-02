import { SAFETY } from '../data/shop.js'
import Reveal from './Reveal.jsx'
import Icon from './Icons.jsx'

export default function Safety() {
  return (
    <section id="safety" className="safety">
      <div className="container">
        <Reveal className="safety-card">
          <span className="safety-icon"><Icon name="shield" size={30} /></span>
          <div>
            <h2>Safety Information</h2>
            <ul>{SAFETY.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
