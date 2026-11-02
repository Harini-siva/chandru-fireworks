import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CATEGORIES } from '../data/categories.js'
import { categoryBySlug } from '../data/catalog.js'
import PageBanner from '../components/PageBanner.jsx'
import { ProductList, ProductToolbar, useProductBrowser } from '../components/ProductBrowser.jsx'
import CategoryIcon from '../components/CategoryIcon.jsx'
import Icon from '../components/Icons.jsx'
import NotFound from './NotFound.jsx'
import '../components/PriceList.css'

const PROMISES = ['Quality Products', 'Traditional Taste', 'Celebrations Made Brighter']

export default function CategoryPage() {
  const { slug } = useParams()
  const category = categoryBySlug(slug)
  const browser = useProductBrowser(slug)
  useEffect(() => { document.title = category ? `${category.cat} | Chandru Crackers` : 'Not found | Chandru Crackers' }, [category])
  if (!category) return <NotFound />

  const words = category.cat.split(' ')
  const accent = words.length > 1 ? words.pop() : ''
  return (
    <>
      <PageBanner
        title={words.join(' ')}
        accent={accent}
        lines={[category.description, 'Find your favourites and contact us for product enquiries.']}
      >
        <ProductToolbar browser={browser} />
      </PageBanner>

      <section className="section section--cream page-section">
        <div className="container">
          <div className="price-link-row">
            <Link className="price-link" to={`/price-list#${slug}`}>View prices for {category.cat} <Icon name="arrow" size={16} /></Link>
          </div>
          <ProductList key={slug} browser={browser} />
          <div className="more-cats">
            <h2><span className="result-rule" aria-hidden="true" />Explore Other Categories</h2>
            <div className="cat-chips">
              {CATEGORIES.filter((c) => c.slug !== slug).map((c) => (
                <Link key={c.slug} className="cat-chip" to={`/category/${c.slug}`}>
                  <CategoryIcon kind={c.kind} /> <span>{c.cat}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="promise-strip">
        <div className="container promise-inner">
          <span className="promise-shield"><Icon name="shield" size={28} /></span>
          {PROMISES.map((t) => <span key={t} className="promise-item">{t}</span>)}
        </div>
      </div>
    </>
  )
}
