import { useEffect, useRef, useState } from 'react'

/* Scroll reveal. One shared IntersectionObserver for the whole page keeps this cheap even with many cards. */
let observer
const callbacks = new WeakMap()
function watch(el, cb) {
  observer ??= new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { callbacks.get(e.target)?.(); observer.unobserve(e.target) }
    }),
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  )
  callbacks.set(el, cb)
  observer.observe(el)
  return () => observer.unobserve(el)
}

export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div', ...rest }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => watch(ref.current, () => setShown(true)), [])
  return (
    <Tag ref={ref} className={`reveal ${shown ? 'in' : ''} ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined} {...rest}>
      {children}
    </Tag>
  )
}
