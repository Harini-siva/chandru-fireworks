/* Dark maroon header for a category page: eyebrow, two-tone serif title, intro lines, and the toolbar (passed as children). */
export default function PageBanner({ eyebrow = 'Our Products', title, accent, lines = [], children }) {
  return (
    <section className="banner">
      <div className="container banner-inner">
        <div className="banner-copy">
          <span className="banner-eyebrow">{eyebrow}</span>
          <h1>{title} {accent && <em>{accent}</em>}</h1>
          {lines.length > 0 && <p>{lines.map((l) => <span key={l}>{l}</span>)}</p>}
        </div>
        {children && <div className="banner-tools">{children}</div>}
      </div>
    </section>
  )
}
