import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SHOP } from '../data/shop.js'
import Countdown from './Countdown.jsx'
import FestivalSky from './FestivalSky.jsx'
import Reveal from './Reveal.jsx'
import Icon from './Icons.jsx'

const date = new Date(SHOP.festival).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

// Skyline silhouette: [x, width, height] per building, plus a tiered gopuram in the middle.
const BUILDINGS = [[0, 70, 46], [70, 54, 70], [124, 80, 52], [204, 46, 84], [250, 90, 50], [340, 60, 66], [400, 80, 44],
  [880, 80, 46], [960, 58, 72], [1018, 90, 52], [1108, 50, 80], [1158, 84, 48], [1242, 64, 68], [1306, 134, 50]]
const WINDOWS = BUILDINGS.flatMap(([x, w, h], i) => [[x + w * 0.28, 160 - h * 0.55, i], [x + w * 0.66, 160 - h * 0.3, i + 3]])
const BULBS = Array.from({ length: 22 })
const EMBERS = Array.from({ length: 14 }, (_, i) => ({ left: (i * 37 + 8) % 100, size: 3 + (i % 4), dur: 9 + (i % 5) * 2.2, delay: -((i * 1.7) % 11) }))

function Skyline() {
  return (
    <svg className="festival-skyline" viewBox="0 0 1440 160" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
      <g fill="#0f0206">
        {BUILDINGS.map(([x, w, h]) => <rect key={x} x={x} y={160 - h} width={w} height={h} />)}
        {/* gopuram */}
        <path d="M520 160V108h400v52H900V92H880V76H858V62H836V50H810V40H630V50H604V62H582V76H560V92H540V160Z" />
        <rect x="716" y="22" width="8" height="20" />
        <rect x="0" y="150" width="1440" height="10" />
      </g>
      <g className="festival-windows" fill="#ffd36b">
        {WINDOWS.map(([x, y, i], k) => <rect key={k} x={x} y={y} width="5" height="7" rx="1" style={{ animationDelay: `${(i % 7) * 0.45}s` }} />)}
        {[600, 640, 680, 760, 800, 840].map((x, k) => <rect key={x} x={x} y={118 + (k % 2) * 14} width="6" height="9" rx="1" style={{ animationDelay: `${k * 0.37}s` }} />)}
      </g>
    </svg>
  )
}

export default function Festival() {
  const [done, setDone] = useState(false)
  return (
    <section id="festival" className="festival">
      <div className="festival-stars" aria-hidden="true" />
      <div className="festival-glow" aria-hidden="true" />
      <FestivalSky />
      <div className="festival-embers" aria-hidden="true">
        {EMBERS.map((e, i) => <i key={i} style={{ left: `${e.left}%`, width: e.size, height: e.size, animationDuration: `${e.dur}s`, animationDelay: `${e.delay}s` }} />)}
      </div>
      <ul className="festival-lights" aria-hidden="true">
        {BULBS.map((_, i) => <li key={i} style={{ animationDelay: `${(i % 6) * 0.35}s` }} />)}
      </ul>
      <Skyline />

      <div className="container">
        <Reveal className="festival-card">
          <span className="eyebrow eyebrow--gold">{SHOP.festivalName}</span>
          <h2 className="section-title">{done ? `Happy ${SHOP.festivalName.replace(/ \d+$/, '')}!` : `${SHOP.festivalName} is coming`}</h2>
          {!done && <p className="section-lead">Counting down to {date}.</p>}
          <Countdown onDone={() => setDone(true)} />
          <p className="festival-offer"><Icon name="lamp" size={18} /> {SHOP.offer}</p>
          <Link className="btn btn-gold" to="/#categories">Start browsing crackers <Icon name="arrow" size={18} /></Link>
        </Reveal>
        <p className="festival-hint" aria-hidden="true">Tap the sky to set off a cracker</p>
      </div>
    </section>
  )
}
