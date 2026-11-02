import { WHY } from '../data/shop.js'
import Reveal from './Reveal.jsx'
import Icon from './Icons.jsx'

export default function WhyChoose() {
  return (
    <section id="why" className="section section--why">
      <div className="container">

        {/* SECTION HEADING */}
        <Reveal className="section-head section-head--light why-heading">
          <span className="eyebrow eyebrow--gold why-eyebrow">
            Why choose us
          </span>

          <h2 className="section-title why-title">
            Why Celebrate with Chandru Crackers
          </h2>

          <p className="section-lead why-lead">
            Trusted service, a wide range and a shop that is ready
            for your festival.
          </p>
        </Reveal>

        {/* WHY CHOOSE US CARDS */}
        <div className="why-grid">
          {WHY.map((w, i) => (
            <Reveal
              key={w.title}
              delay={i * 120}
              className="why-wrap"
            >
              <div className="why-card">

                <span className="why-icon">
                  <Icon name={w.icon} size={28} />
                </span>

                <h3>{w.title}</h3>

                <p>{w.text}</p>

                <span className="why-card-decoration" />
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}
