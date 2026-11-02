import { useEffect, useRef } from 'react'
import './SpotVideo.css'
/* Background video for a spotlight section.
   - Nothing is downloaded until the section is close to the screen (poster image shows first).
   - Plays only while visible and while the tab is open, so three videos never run at once.
   - Muted + playsInline so it autoplays on phones; respects "reduce motion" (poster only). */
export default function SpotVideo({ src, poster, start = 0, flip = false, tint }) {
  const ref = useRef(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let near = false, shown = false

    const play = () => { const p = v.play(); p?.catch(() => {}) }
    const sync = () => {
      if (near && shown && !document.hidden) play()
      else v.pause()
    }
    const onMeta = () => { if (start && v.duration > start) v.currentTime = start }
    // when the clip loops, jump back to the chosen start point so each section feels different
    const onEnded = () => { v.currentTime = start || 0; if (near && shown) play() }

    const loadObs = new IntersectionObserver(([e]) => {
      near = e.isIntersecting
      if (near && !v.getAttribute('src')) { v.src = src; v.load() }
      sync()
    }, { rootMargin: '300px 0px' })
    const playObs = new IntersectionObserver(([e]) => { shown = e.isIntersecting; sync() }, { threshold: 0.1 })

    v.addEventListener('loadedmetadata', onMeta)
    v.addEventListener('ended', onEnded)
    document.addEventListener('visibilitychange', sync)
    loadObs.observe(v)
    playObs.observe(v)
    return () => {
      loadObs.disconnect(); playObs.disconnect()
      v.removeEventListener('loadedmetadata', onMeta)
      v.removeEventListener('ended', onEnded)
      document.removeEventListener('visibilitychange', sync)
    }
  }, [src, start])

  return (
    <video
      ref={ref}
      className={`spot-video-media ${flip ? 'is-flipped' : ''} ${tint ? `tint-${tint}` : ''}`}
      poster={poster}
      muted
      playsInline
      loop={!start}
      preload="none"
      disablePictureInPicture
      aria-hidden="true"
      tabIndex={-1}
    />
  )
}
