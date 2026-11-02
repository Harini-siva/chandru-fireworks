import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SHOP, NAV } from '../data/shop.js'
import { generalEnquiry } from '../utils/whatsapp.js'
import Logo from './Logo.jsx'
import Icon from './Icons.jsx'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname, hash } = useLocation()
  const onHome = pathname === '/'

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => setOpen(false), [pathname, hash])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.classList.add('no-scroll-mobile')
    return () => { document.removeEventListener('keydown', onKey); document.body.classList.remove('no-scroll-mobile') }
  }, [open])

  const isActive = (to) => (to === '/price-list' && pathname === '/price-list') || (to === '/#categories' && pathname.startsWith('/category')) || (onHome && (to === `/${hash}` || (!hash && to === '/#home')))

  return (
    <header className={`nav ${scrolled || open || !onHome ? 'nav--solid' : ''}`}>
      <div className="nav-inner">
        <Link to="/#home" className="brand" aria-label={`${SHOP.name} home`}>
          <Logo size={58} className="logo-nav" />
          <span className="brand-text"><b>{SHOP.name}</b><small>{SHOP.tamil}</small></span>
        </Link>

        <nav id="primary-nav" className={`nav-links ${open ? 'open' : ''}`} aria-label="Primary">
          {NAV.map((n) => (
            <Link key={n.label} to={n.to} className={isActive(n.to) ? 'active' : ''}>{n.label}</Link>
          ))}
          <a className="btn btn-wa nav-cta-mobile" href={generalEnquiry()} target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" size={20} /> 
          </a>
        </nav>

        <a className="btn btn-gold btn-sm nav-cta" href={generalEnquiry()} target="_blank" rel="noopener noreferrer">
          <Icon name="whatsapp" size={18} /> 
        </a>
        <button className="burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen(!open)}>
          <Icon name={open ? 'close' : 'menu'} size={26} />
        </button>
      </div>
    </header>
  )
}
