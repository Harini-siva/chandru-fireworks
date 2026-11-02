import { Link } from 'react-router-dom'
import { SPOTLIGHT } from '../data/shop.js'
import { categoryBySlug, productsInCategory } from '../data/catalog.js'
import { wa } from '../utils/whatsapp.js'
import Reveal from './Reveal.jsx'
import Fireworks from './Fireworks.jsx'
import SpotVideo from './SpotVideo.jsx'
import Icon from './Icons.jsx'
import './CategorySpotlights.css'
const GOLDS = [
  '#f6ce58',
  '#ffe291',
  '#fff8e8',
  '#ff9f43'
]

const REDS = [
  '#f6ce58',
  '#ff6b6b',
  '#fff8e8'
]

/*
  Full-screen category spotlight sections.

  Each category uses:
  - Background video
  - Dark readability overlay
  - Fireworks animation
  - Category information
  - Popular products
  - View Products button
  - WhatsApp enquiry button
*/

export default function CategorySpotlights() {
  return (
    <div id="spotlight">

      {SPOTLIGHT.map((s, i) => {
        const cat = categoryBySlug(s.slug)
        const items = productsInCategory(s.slug)

        // Safety check in case a category is missing
        if (!cat) {
          return null
        }

        return (
          <section
            key={s.slug}
            className={`spot ${i % 2 ? 'spot--flip' : ''}`}
            aria-labelledby={`spot-${s.slug}`}
          >

            {/* =================================================
                BACKGROUND VIDEO
               ================================================= */}

            <div
              className="spot-video"
              aria-hidden="true"
            >
              <SpotVideo
                src={s.video}
                poster={s.poster}
                start={s.start}
                flip={s.flip}
                tint={s.tint}
              />

              {/* Dark overlay for better text readability */}
              <div className="spot-video-overlay" />
            </div>


            {/* =================================================
                FIREWORKS
               ================================================= */}

            <Fireworks
              colors={i === 1 ? GOLDS : REDS}
              interval={2300}
              count={34}
            />


            {/* =================================================
                CONTENT
               ================================================= */}

            <div className="container spot-inner">

              <Reveal className="spot-copy">

                {/* Eyebrow */}
                <span className="eyebrow eyebrow--gold">
                  {s.eyebrow}
                </span>


                {/* Category Name */}
                <h2 id={`spot-${s.slug}`}>
                  {cat.cat}
                </h2>


                {/* Short Category Line */}
                <p className="spot-line">
                  {s.line}
                </p>


                {/* Category Description */}
                <p className="spot-text">
                  {cat.description}
                </p>


                {/* =================================================
                    POPULAR PRODUCTS
                   ================================================= */}

                {items.length > 0 && (
                  <ul
                    className="spot-items"
                    aria-label={`Popular in ${cat.cat}`}
                  >
                    {items.slice(0, 3).map((product) => (
                      <li key={product.id}>
                        {product.name}
                      </li>
                    ))}
                  </ul>
                )}


                {/* =================================================
                    ACTION BUTTONS
                   ================================================= */}

                <div className="btn-row">

                  {/* View Products */}
                  <Link
                    className="btn btn-gold"
                    to={`/category/${cat.slug}`}
                  >
                    <span>
                      View Products
                    </span>

                    <Icon
                      name="arrow"
                      size={18}
                    />
                  </Link>


                  {/* WhatsApp Enquiry */}
                  <a
                    className="btn btn-glass"
                    href={wa(
                      `Hi, I would like to know more about your ${cat.cat}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon
                      name="whatsapp"
                      size={18}
                    />

                    <span>
                      Enquire on WhatsApp
                    </span>
                  </a>

                </div>

              </Reveal>

            </div>

          </section>
        )
      })}

    </div>
  )
}