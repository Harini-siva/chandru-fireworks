import { useRef, useState } from 'react'
import Reveal from './Reveal.jsx'
import './ShopAd.css'

const VIDEO_SRC = '/videos/chandru-shop.mp4'
const POSTER_SRC = '/images/shop-ad-poster.jpg'

// Floating gold sparks (pure CSS, positions fixed so nothing re-renders)
const SPARKS = [
  { l: '6%', d: 0, s: 5 }, { l: '14%', d: 2.4, s: 3 }, { l: '23%', d: 4.1, s: 4 },
  { l: '34%', d: 1.2, s: 3 }, { l: '47%', d: 3.3, s: 5 }, { l: '58%', d: 0.6, s: 3 },
  { l: '68%', d: 2.9, s: 4 }, { l: '77%', d: 4.8, s: 3 }, { l: '86%', d: 1.7, s: 5 },
  { l: '94%', d: 3.8, s: 4 },
]

/* "Our Shop": one cinematic advertisement. The video is not requested and never autoplays on load —
   it is only mounted (with sound and controls) after the visitor taps the play button. */
export default function ShopAd() {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)

  const start = () => {
    setPlaying(true)
    // The video mounts on the next render; play it inside the same click so sound is allowed.
    requestAnimationFrame(() => {
      const v = videoRef.current
      if (!v) return
      const p = v.play()
      p?.catch(() => {}) // if the browser blocks it, the native controls are already visible
      v.focus({ preventScroll: true })
    })
  }

  return (
    <section id="our-shop" className="ad-shop" aria-labelledby="ad-shop-title">
      <div className="ad-bg" aria-hidden="true">
        <span className="ad-glow ad-glow--a" />
        <span className="ad-glow ad-glow--b" />
        {SPARKS.map((s, i) => (
          <i key={i} className="ad-spark" style={{ left: s.l, animationDelay: `${s.d}s`, width: s.s, height: s.s }} />
        ))}
      </div>

      <div className="ad-container">
        <Reveal className="ad-head">
          <span className="ad-eyebrow">Our Shop</span>
          <h2 id="ad-shop-title" className="ad-title">
            <span className="ad-title-brand">CHANDRU CRACKERS</span>
            <span className="ad-title-dash" aria-hidden="true">–</span>
            <span className="ad-title-tag">Celebrate Every Moment!</span>
          </h2>
          <p className="ad-sub">Your Happiness. Our Celebration.</p>
        </Reveal>

        <Reveal className="ad-stage" delay={140}>
          <div className={`ad-frame ${playing ? 'is-playing' : ''}`}>
            <span className="ad-corner ad-corner--tl" aria-hidden="true" />
            <span className="ad-corner ad-corner--tr" aria-hidden="true" />
            <span className="ad-corner ad-corner--bl" aria-hidden="true" />
            <span className="ad-corner ad-corner--br" aria-hidden="true" />

            <div className="ad-player">
              {playing ? (
                <video
                  ref={videoRef}
                  className="ad-video"
                  src={VIDEO_SRC}
                  poster={POSTER_SRC}
                  controls
                  playsInline
                  preload="auto"
                  controlsList="nodownload"
                  disablePictureInPicture
                  aria-label="Chandru Crackers shop advertisement"
                />
              ) : (
                <button type="button" className="ad-poster" onClick={start} aria-label="Play the Chandru Crackers advertisement">
                  <img src={POSTER_SRC} alt="" loading="lazy" decoding="async" />
                  <span className="ad-poster-shade" aria-hidden="true" />
                  <span className="ad-sheen" aria-hidden="true" />
                  <span className="ad-play" aria-hidden="true">
                    <span className="ad-ring ad-ring--1" />
                    <span className="ad-ring ad-ring--2" />
                    <span className="ad-play-core">
                      <svg viewBox="0 0 24 24" width="100%" height="100%" focusable="false"><path d="M8.5 5.6v12.8a.9.9 0 0 0 1.38.76l10-6.4a.9.9 0 0 0 0-1.52l-10-6.4A.9.9 0 0 0 8.5 5.6Z" fill="currentColor" /></svg>
                    </span>
                  </span>
                  <span className="ad-watch">Watch the Film</span>
                </button>
              )}
            </div>
          </div>
          <span className="ad-reflection" aria-hidden="true" />
        </Reveal>

        <Reveal className="ad-desc-wrap" delay={220}>
          <span className="ad-rule" aria-hidden="true" />
          <p className="ad-desc">Discover the excitement, colours and happiness of celebrating with Chandru Crackers.</p>
        </Reveal>
      </div>
    </section>
  )
}
