import { useEffect, useState } from 'react'
import { SHOP } from '../data/shop.js'

const UNITS = [['Days', 864e5, 1e5], ['Hours', 36e5, 24], ['Minutes', 6e4, 60], ['Seconds', 1e3, 60]]

export default function Countdown({ onDone }) {
  const target = new Date(SHOP.festival).getTime()
  const [left, setLeft] = useState(() => Math.max(0, target - Date.now()))

  useEffect(() => {
    const tick = () => setLeft(Math.max(0, target - Date.now()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])

  useEffect(() => { if (left === 0) onDone?.() }, [left, onDone])

  return (
    <div className="count" role="timer" aria-label={`Time left until ${SHOP.festivalName}`}>
      {UNITS.map(([label, ms, mod]) => {
        const v = String(Math.floor(left / ms) % mod).padStart(2, '0')
        return (
          <div className="count-box" key={label}>
            <b key={v} className="count-num">{v}</b>
            <span>{label}</span>
          </div>
        )
      })}
    </div>
  )
}
