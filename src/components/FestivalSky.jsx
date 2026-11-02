import { useEffect, useRef } from 'react'

/* Diwali night sky: a continuous canvas fireworks show.
   - Rockets climb with a spark trail, then burst as peony, ring, willow, glitter, heart, star or double bursts
   - Ground fountains (flower-pot style) shoot gold sparks up from the bottom edge
   - Every ~14 s a grand finale fires a rapid volley of bursts
   - Tap / click anywhere on the section for an instant burst
   Performance: pauses off-screen and in hidden tabs, caps pixel ratio and particle count, uses fewer particles on phones.
   Reduced-motion users get the static glow / stars from CSS instead. */

const HUES = [45, 8, 330, 28, 140, 200, 275, 52, 18, 175]
const TYPES = ['peony', 'peony', 'ring', 'willow', 'glitter', 'heart', 'star', 'double']
const rand = (a, b) => a + Math.random() * (b - a)
const pick = (arr) => arr[(Math.random() * arr.length) | 0]
const hsl = (h, s, l) => `hsl(${h} ${s}% ${l}%)`

export default function FestivalSky({ interactive = true, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    const parent = canvas.parentElement
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    let w = 0, h = 0, small = false, maxSparks = 800
    let raf = 0, last = 0, visible = false
    let sparks = [], rockets = [], glows = [], fountains = [], queue = []
    let nextAuto = 0, nextFinale = 0, nextFountain = 0

    const fit = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      small = w < 640
      maxSparks = small ? 520 : 1150
      canvas.width = Math.max(1, Math.round(w * dpr))
      canvas.height = Math.max(1, Math.round(h * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const spark = (x, y, vx, vy, o = {}) => {
      if (sparks.length >= maxSparks) return
      const hue = o.h ?? 45
      sparks.push({
        x, y, vx, vy,
        life: 1,
        decay: o.decay ?? rand(0.011, 0.02),
        drag: o.drag ?? 0.965,
        grav: o.grav ?? 0.04,
        size: o.size ?? 1.7,
        streak: o.streak ?? 2.2,
        glitter: !!o.glitter,
        color: hsl(hue, o.s ?? 100, o.l ?? 62),
      })
    }

    /* ---------- bursts ---------- */
    const explode = (x, y, type = pick(TYPES), hue = pick(HUES)) => {
      const R = Math.max(3.2, Math.min(8, Math.min(w, h * 1.5) * 0.0118))
      const k = small ? 0.62 : 1
      const room = maxSparks - sparks.length
      if (room < 24) return
      const scale = Math.min(1, room / (110 * k))
      const n = (base) => Math.max(10, Math.round(base * k * scale))
      const hue2 = (hue + rand(100, 200)) % 360

      if (type === 'peony' || type === 'glitter') {
        const m = n(96)
        for (let i = 0; i < m; i++) {
          const a = rand(0, Math.PI * 2), v = R * (0.3 + 0.7 * Math.sqrt(Math.random()))
          const white = Math.random() < 0.18
          spark(x, y, Math.cos(a) * v, Math.sin(a) * v, { h: hue + rand(-8, 8), s: white ? 40 : 100, l: white ? 92 : 62, glitter: type === 'glitter', decay: type === 'glitter' ? rand(0.008, 0.013) : undefined })
        }
      } else if (type === 'ring') {
        const m = n(52)
        for (let i = 0; i < m; i++) {
          const a = (i / m) * Math.PI * 2
          spark(x, y, Math.cos(a) * R * 0.92, Math.sin(a) * R * 0.92, { h: hue, decay: 0.014 })
        }
        const m2 = n(26)
        for (let i = 0; i < m2; i++) {
          const a = (i / m2) * Math.PI * 2 + 0.3
          spark(x, y, Math.cos(a) * R * 0.5, Math.sin(a) * R * 0.5, { h: hue2, l: 70, decay: 0.017 })
        }
      } else if (type === 'willow') {
        const m = n(64)
        for (let i = 0; i < m; i++) {
          const a = rand(0, Math.PI * 2), v = R * rand(0.35, 0.8)
          spark(x, y, Math.cos(a) * v, Math.sin(a) * v, { h: rand(38, 50), l: 66, drag: 0.972, grav: 0.052, decay: rand(0.006, 0.009), streak: 5.5, size: 1.5 })
        }
      } else if (type === 'heart') {
        const m = n(60)
        for (let i = 0; i < m; i++) {
          const t = (i / m) * Math.PI * 2
          const hx = 16 * Math.sin(t) ** 3
          const hy = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)
          spark(x, y, (hx / 16) * R * 0.78, (-hy / 16) * R * 0.78, { h: pick([350, 335, 0]), l: 62, decay: 0.012, grav: 0.025 })
        }
      } else if (type === 'star') {
        const m = n(70)
        for (let i = 0; i < m; i++) {
          const a = (i / m) * Math.PI * 2
          const r = 0.45 + 0.55 * Math.abs(Math.cos(2.5 * a)) ** 1.4
          spark(x, y, Math.cos(a) * R * r * 1.05, Math.sin(a) * R * r * 1.05, { h: pick([45, 52, 28]), l: 66, decay: 0.013, grav: 0.03 })
        }
      } else { // double: big peony + inner contrasting ring
        const m = n(62)
        for (let i = 0; i < m; i++) {
          const a = rand(0, Math.PI * 2), v = R * rand(0.55, 1)
          spark(x, y, Math.cos(a) * v, Math.sin(a) * v, { h: hue })
        }
        const m2 = n(30)
        for (let i = 0; i < m2; i++) {
          const a = (i / m2) * Math.PI * 2
          spark(x, y, Math.cos(a) * R * 0.45, Math.sin(a) * R * 0.45, { h: hue2, l: 72, decay: 0.017 })
        }
      }
      glows.push({ x, y, r: R * (small ? 34 : 46), life: 1, color: hue })
    }

    const launch = (x = rand(w * 0.07, w * 0.93), forceType) => {
      const ty = rand(h * 0.08, h * 0.58)
      const dist = h - ty
      rockets.push({
        x, y: h + 6,
        vx: rand(-0.5, 0.5) + (w / 2 - x) * 0.0006,
        vy: -Math.sqrt(2 * 0.06 * dist),
        ty, hue: pick(HUES), type: forceType ?? pick(TYPES),
      })
    }

    const fountain = () => fountains.push({ x: rand(w * 0.05, w * 0.95), until: performance.now() + rand(1800, 3000) })

    const finale = () => {
      const t = performance.now()
      const bursts = small ? 9 : 14
      for (let i = 0; i < bursts; i++) queue.push({ at: t + i * 150, fn: () => launch(rand(w * 0.05, w * 0.95)) })
      queue.push({ at: t, fn: fountain }, { at: t + 300, fn: fountain }, { at: t + 600, fn: fountain })
    }

    /* ---------- main loop ---------- */
    const frame = (t) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min((t - last) / 16.667 || 1, 2.5)
      last = t

      // scheduled things
      if (queue.length) {
        const due = queue.filter((q) => q.at <= t)
        if (due.length) { queue = queue.filter((q) => q.at > t); due.forEach((q) => q.fn()) }
      }
      if (t >= nextAuto) {
        launch()
        if (Math.random() < 0.45) launch()
        if (!small && Math.random() < 0.2) launch()
        nextAuto = t + (small ? rand(480, 950) : rand(260, 620))
      }
      if (t >= nextFountain) { fountain(); nextFountain = t + rand(2600, 4200) }
      if (t >= nextFinale) { finale(); nextFinale = t + rand(11000, 15000) }

      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'
      ctx.lineCap = 'round'

      // glows from bursts
      for (let i = glows.length - 1; i >= 0; i--) {
        const g = glows[i]
        const grad = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.r)
        grad.addColorStop(0, `hsla(${g.color} 100% 65% / ${0.26 * g.life})`)
        grad.addColorStop(1, `hsla(${g.color} 100% 55% / 0)`)
        ctx.fillStyle = grad
        ctx.fillRect(g.x - g.r, g.y - g.r, g.r * 2, g.r * 2)
        g.life -= 0.045 * dt
        if (g.life <= 0) glows.splice(i, 1)
      }

      // rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i]
        r.x += r.vx * dt
        r.y += r.vy * dt
        r.vy += 0.06 * dt
        spark(r.x, r.y, rand(-0.3, 0.3), rand(0.4, 1.1), { h: 40, l: 70, decay: 0.07, drag: 0.9, grav: 0.02, size: 1.3, streak: 0 })
        ctx.strokeStyle = 'hsl(48 100% 85%)'
        ctx.lineWidth = 2.4
        ctx.globalAlpha = 1
        ctx.beginPath(); ctx.moveTo(r.x - r.vx * 4, r.y - r.vy * 4); ctx.lineTo(r.x, r.y); ctx.stroke()
        if (r.vy >= -0.6 || r.y <= r.ty) { explode(r.x, r.y, r.type, r.hue); rockets.splice(i, 1) }
      }

      // ground fountains
      const now = performance.now()
      fountains = fountains.filter((f) => f.until > now)
      for (const f of fountains) {
        for (let j = 0; j < (small ? 2 : 4); j++) {
          spark(f.x + rand(-3, 3), h - 2, rand(-0.9, 0.9), -rand(3.2, 6.4), { h: rand(30, 50), l: 64, drag: 0.985, grav: 0.1, decay: rand(0.016, 0.026), streak: 2.5, size: 1.5 })
        }
      }

      // sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i]
        const d = 1 - (1 - p.drag) * dt
        p.vx *= d
        p.vy = p.vy * d + p.grav * dt
        p.x += p.vx * dt
        p.y += p.vy * dt
        p.life -= p.decay * dt
        if (p.life <= 0 || p.y > h + 20) { sparks[i] = sparks[sparks.length - 1]; sparks.pop(); continue }
        const a = p.life * p.life * (p.glitter ? 0.4 + Math.random() * 0.6 : 1)
        ctx.globalAlpha = a
        if (p.streak > 0) {
          ctx.strokeStyle = p.color
          ctx.lineWidth = p.size
          ctx.beginPath(); ctx.moveTo(p.x - p.vx * p.streak, p.y - p.vy * p.streak); ctx.lineTo(p.x, p.y); ctx.stroke()
        } else {
          ctx.fillStyle = p.color
          ctx.fillRect(p.x, p.y, p.size, p.size)
        }
      }
      ctx.globalAlpha = 1
    }

    /* ---------- lifecycle ---------- */
    const start = () => {
      if (raf || !visible || document.hidden) return
      const t = performance.now()
      last = t
      nextAuto = t + 200
      nextFountain = t + 600
      nextFinale = t + 7000
      queue.push({ at: t + 100, fn: () => launch(w * 0.3) }, { at: t + 350, fn: () => launch(w * 0.7) }, { at: t + 650, fn: () => launch(w * 0.5, 'double') })
      raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
      sparks = []; rockets = []; glows = []; fountains = []; queue = []
      ctx.clearRect(0, 0, w, h)
    }

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop() }, { threshold: 0.05 })
    const onVis = () => (document.hidden ? stop() : start())
    const ro = new ResizeObserver(fit)
    const onPointer = (e) => {
      if (e.target.closest('a, button')) return
      const r = canvas.getBoundingClientRect()
      explode(e.clientX - r.left, e.clientY - r.top)
    }

    fit()
    io.observe(canvas)
    ro.observe(canvas)
    document.addEventListener('visibilitychange', onVis)
    if (interactive) parent.addEventListener('pointerdown', onPointer)
    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      if (interactive) parent.removeEventListener('pointerdown', onPointer)
    }
  }, [interactive])

  return <canvas ref={ref} className={`fx festival-sky ${className}`} aria-hidden="true" />
}
