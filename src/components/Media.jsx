import ProductArt from './ProductArt.jsx'
import { resolveImage } from '../utils/media.js'

/* Shows a real photo when one exists in src/assets, otherwise the built-in artwork.
   The wrapper always has the same aspect ratio so cards stay uniform. */
export default function Media({ src, kind, variant = 0, scene, alt, className = '', eager = false }) {
  const url = resolveImage(src)
  return (
    <div className={`media ${className}`}>
      {url ? (
        <img src={url} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
      ) : (
        <ProductArt kind={kind} variant={variant} scene={scene} label={alt} />
      )}
    </div>
  )
}
