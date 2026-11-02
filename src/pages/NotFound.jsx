import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section section--cream not-found">
      <div className="container center">
        <h1>We couldn’t find that page</h1>
        <p>The page may have moved. Browse our products or head back home.</p>
        <div className="btn-row btn-row--center">
          <Link className="btn btn-maroon" to="/#categories">Browse categories</Link>
          <Link className="btn btn-outline-dark" to="/">Back to home</Link>
        </div>
      </div>
    </section>
  )
}
