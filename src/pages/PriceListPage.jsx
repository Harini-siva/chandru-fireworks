import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PRICE_SECTIONS, WATTS_OFFERS, COMBO_OFFERS, PRICE_NOTES, TOTAL_ITEMS, formatPrice } from '../data/priceList.js'
import { generalEnquiry, wa } from '../utils/whatsapp.js'
import PageBanner from '../components/PageBanner.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icons.jsx'
import '../components/PriceList.css'

const norm = (s) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9\u0B80-\u0BFF ]+/g, ' ')

function OfferCards({ id, eyebrow, title, note, offers, unitLabel }) {
  return (
    <section id={id} className="pl-offers">
      <div className="pl-offers-head">
        <span className="pl-offers-eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {note && <p>{note}</p>}
      </div>
      <ul className="pl-offer-grid">
        {offers.map((o) => (
          <li key={o.name + o.qty} className="pl-offer">
            <span className="pl-offer-price"><small>₹</small>{o.price.toLocaleString('en-IN')}</span>
            <strong>{o.name}</strong>
            <span className="pl-ta" lang="ta">{o.tamil}</span>
            <span className="pl-offer-qty">{unitLabel} {o.qty}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function PriceListPage() {
  const [q, setQ] = useState('')
  useEffect(() => { document.title = 'Price List | Chandru Crackers' }, [])

  const sections = useMemo(() => {
    const words = norm(q).split(' ').filter(Boolean)
    if (!words.length) return PRICE_SECTIONS
    return PRICE_SECTIONS
      .map((s) => ({ ...s, items: s.items.filter((i) => { const hay = norm(`${i.name} ${i.tamil} ${i.no} ${s.title}`); return words.every((w) => hay.includes(w)) }) }))
      .filter((s) => s.items.length)
  }, [q])
  const found = sections.reduce((n, s) => n + s.items.length, 0)

  return (
    <>
      <PageBanner
        eyebrow="Chandru Crackers"
        title="Price"
        accent="List"
        lines={[`All ${TOTAL_ITEMS} products with their prices, sheet by sheet.`, 'Prices are in rupees (₹) per pack as printed in our shop list.']}
      >
        <div className="toolbar" role="search">
          <label className="search">
            <Icon name="search" size={20} />
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the price list…" aria-label="Search the price list" />
            {q && <button type="button" className="search-clear" onClick={() => setQ('')} aria-label="Clear search"><Icon name="close" size={16} /></button>}
          </label>
          <button type="button" className="btn btn-glass btn-sm pl-print" onClick={() => window.print()}>Print list</button>
        </div>
      </PageBanner>

      <nav className="pl-jump" aria-label="Price list sections">
        <div className="container pl-jump-inner">
          <Link to="/price-list#combo-offers">Combo Offers</Link>
          {PRICE_SECTIONS.map((s) => <Link key={s.slug} to={`/price-list#${s.slug}`}>{s.title}</Link>)}
        </div>
      </nav>

      <section className="section section--cream pl-page">
        <div className="container">
          <div className="pl-notice">
            <p lang="ta">{PRICE_NOTES.discountTamil}</p>
            <p className="pl-notice-en">{PRICE_NOTES.discountEn}</p>
          </div>

          <OfferCards
            id="combo-offers"
            eyebrow="பாண்டியனின் அதிரடி காம்போ ஆஃபர்"
            title="Pandiyan’s Blast Combo Offer"
            note={PRICE_NOTES.comboEn}
            offers={COMBO_OFFERS}
            unitLabel="Pack of"
          />

          {q && <p className="result-count" aria-live="polite"><span className="result-rule" aria-hidden="true" />{found} {found === 1 ? 'Item' : 'Items'} Found · <button type="button" className="link-btn" onClick={() => setQ('')}>Clear search</button></p>}

          {sections.map((s) => (
            <Reveal key={s.slug} as="section" id={s.slug} className="pl-card">
              <header className="pl-card-head">
                <h2>{s.title}</h2>
                <span className="pl-count">{s.items.length} {s.items.length === 1 ? 'item' : 'items'}</span>
                <Link className="pl-viewcat" to={`/category/${s.slug}`}>View category <Icon name="arrow" size={14} /></Link>
              </header>
              <div className="pl-cols" role="table" aria-label={`${s.title} prices`}>
                <div className="pl-colhead" role="row">
                  <span role="columnheader">Sl.No.</span><span role="columnheader">Name of the Products</span><span role="columnheader">Price / Box</span>
                </div>
                <ul className="pl-rows">
                  {s.items.map((i) => (
                    <li key={i.no} className="pl-row" role="row">
                      <span className="pl-no" role="cell">{i.no}</span>
                      <span className="pl-name" role="cell">
                        <b>{i.name}</b>
                        <span className="pl-ta" lang="ta">{i.tamil}</span>
                      </span>
                      <span className="pl-price" role="cell"><b>{formatPrice(i.price)}</b><small>1 {i.unit}</small></span>
                    </li>
                  ))}
                </ul>
              </div>

              {s.slug === 'pandiyan-gift-box' && !q && (
                <OfferCards id="watts-offers" eyebrow="Special Offer" title="Watts Box Offers" offers={WATTS_OFFERS} unitLabel="Pack of" />
              )}
            </Reveal>
          ))}

          {!found && (
            <div className="empty">
              <h3>No items found</h3>
              <p>Try a different word, or ask us directly on WhatsApp.</p>
              <button type="button" className="btn btn-gold" onClick={() => setQ('')}>Clear search</button>
            </div>
          )}

          <div className="pl-final">
            <p lang="ta">{PRICE_NOTES.saleTamil}</p>
            <p className="pl-notice-en">{PRICE_NOTES.saleEn}</p>
            <div className="btn-row btn-row--center">
              <a className="btn btn-wa" href={generalEnquiry()} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={20} /> Enquire on WhatsApp</a>
              <a className="btn btn-outline-dark" href={wa('Hi, I would like to know about the combo offers.')} target="_blank" rel="noopener noreferrer">Ask about combo offers</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
