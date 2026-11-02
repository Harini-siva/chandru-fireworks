import { useEffect, useRef } from 'react'

const DEFAULT_COLORS = ['#f6ce58', '#ff6b6b', '#fff8e8', '#ffb347', '#ff7ab6']

/* Lightweight canvas fireworks. Runs only while on screen and while the tab is visible,
   caps the pixel ratio, uses fewer particles on small screens, and is static for reduced-motion users. */
export default function Fireworks({ interval = 1900, count = 38, interactive = false, colors = DEFAULT_COLORS, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let w = 0, h = 0, parts = [], raf = 0, timer = 0, visible = false

    const fit = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.max(1, Math.round(w * dpr))
      canvas.height = Math.max(1, Math.round(h * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const burst = (x, y) => {
      const n = w < 640 ? Math.round(count * 0.65) : count
      const c = colors[Math.floor(Math.random() * colors.length)]
      for (let i = 0; i < n; i++) {
        const a = (Math.PI * 2 * i) / n + Math.random() * 0.2
        const s = 1.2 + Math.random() * 2.8
        parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, c: Math.random() < 0.3 ? '#fff8e8' : c })
      }
    }

    const frame = () => {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = 'rgba(0,0,0,0.16)'
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'
      parts = parts.filter((p) => p.life > 0)
      for (const p of parts) {
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.985
        p.vy = p.vy * 0.985 + 0.035
        p.life -= 0.014
        ctx.globalAlpha = Math.max(p.life, 0)
        ctx.fillStyle = p.c
        ctx.fillRect(p.x, p.y, 2.4, 2.4)
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(frame)
    }

    const start = () => {
      if (raf || !visible || document.hidden) return
      burst(Math.random() * w, h * (0.15 + Math.random() * 0.4))
      raf = requestAnimationFrame(frame)
      timer = setInterval(() => burst(Math.random() * w, h * (0.12 + Math.random() * 0.5)), interval)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      clearInterval(timer)
      raf = 0
      timer = 0
    }

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop() }, { threshold: 0.05 })
    const onVis = () => (document.hidden ? stop() : start())
    const ro = new ResizeObserver(fit)
    const parent = canvas.parentElement
    const onClick = (e) => {
      const r = canvas.getBoundingClientRect()
      burst(e.clientX - r.left, e.clientY - r.top)
    }

    fit()
    io.observe(canvas)
    ro.observe(canvas)
    document.addEventListener('visibilitychange', onVis)
    if (interactive) parent.addEventListener('click', onClick)
    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      if (interactive) parent.removeEventListener('click', onClick)
    }
  }, [interval, count, interactive, colors])

  return <canvas ref={ref} className={`fx ${className}`} aria-hidden="true" />
}
