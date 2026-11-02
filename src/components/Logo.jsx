import { useState } from 'react'
import { SHOP } from '../data/shop.js'
import logoSrc from '../assets/logo/logo-nav.png'

// Wide winged emblem (transparent background). Falls back to a gold "RSC" badge if the file ever fails to load.
export default function Logo({ size = 56, className = '' }) {
  const [ok, setOk] = useState(true)
  return ok ? (
    <img className={`logo-img ${className}`} src={logoSrc} alt={`${SHOP.name} logo`} height={size} width={Math.round(size * 1.82)} style={{ height: size, width: 'auto' }} decoding="async" onError={() => setOk(false)} />
  ) : (
    <span className="logo-fallback" style={{ width: size, height: size, fontSize: size * 0.3 }} role="img" aria-label={`${SHOP.name} logo`}>RSC</span>
  )
}
