import { useEffect, useMemo, useState } from 'react'
import { CATALOG } from '../data/catalog.js'
import ProductCard from './ProductCard.jsx'
import Icon from './Icons.jsx'

const norm = (s) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9 ]+/g, ' ')

/* Search + sort + grid/list state for ONE category. Products are only ever listed inside their own category. */
export function useProductBrowser(category) {
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('default')
  const [view, setView] = useState('grid')

  useEffect(() => { setQ(''); setSort('default') }, [category])

  const products = useMemo(() => {
    const words = norm(q).split(' ').filter(Boolean)
    let list = CATALOG.filter((p) => {
      if (p.categorySlug !== category) return false
      if (!words.length) return true
      const hay = norm(`${p.name} ${p.originalName} ${p.slNo}`)
      return words.every((w) => hay.includes(w))
    })
    if (sort === 'az') list = [...list].sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
    if (sort === 'za') list = [...list].sort((a, b) => b.name.localeCompare(a.name, undefined, { numeric: true }))
    return list
  }, [q, sort, category])

  return { q, setQ, sort, setSort, view, setView, products }
}

export function ProductToolbar({ browser: { q, setQ, sort, setSort, view, setView } }) {
  return (
    <div className="toolbar" role="search">
      <label className="search">
        <Icon name="search" size={20} />
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search in this category…" aria-label="Search products" />
        {q && <button type="button" className="search-clear" onClick={() => setQ('')} aria-label="Clear search"><Icon name="close" size={16} /></button>}
      </label>

      <select className="select" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products">
        <option value="default">Default order</option>
        <option value="az">Name A – Z</option>
        <option value="za">Name Z – A</option>
      </select>

      <div className="view-toggle" role="group" aria-label="Layout">
        <button type="button" className={view === 'grid' ? 'on' : ''} onClick={() => setView('grid')} aria-pressed={view === 'grid'} aria-label="Grid view"><Icon name="grid" size={18} /></button>
        <button type="button" className={view === 'list' ? 'on' : ''} onClick={() => setView('list')} aria-pressed={view === 'list'} aria-label="List view"><Icon name="list" size={18} /></button>
      </div>
    </div>
  )
}

export function ProductList({ browser: { q, setQ, view, products } }) {
  return (
    <div className="browser">
      <p className="result-count" aria-live="polite">
        <span className="result-rule" aria-hidden="true" />
        {products.length} {products.length === 1 ? 'Product' : 'Products'} Found
        {q && <> · <button type="button" className="link-btn" onClick={() => setQ('')}>Clear search</button></>}
      </p>

      {products.length ? (
        <div className={`pgrid ${view === 'list' ? 'pgrid--list' : ''}`}>
          {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} view={view} delay={(i % 4) * 70} />)}
        </div>
      ) : (
        <div className="empty">
          <h3>No products found</h3>
          <p>Try a different word. You can also ask us directly on WhatsApp.</p>
          <button type="button" className="btn btn-gold" onClick={() => setQ('')}>Clear search</button>
        </div>
      )}
    </div>
  )
}
