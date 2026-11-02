import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/*
 * Scrolls to #sections after navigation
 * (including navigation from other pages)
 * and scrolls to the top on new pages.
 */

export default function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    let timer = null
    let tries = 0

    // No hash → scroll to top
    if (!hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      })

      // IMPORTANT:
      // Do not return window.scrollTo()
      // useEffect must return nothing or a cleanup function.
      return undefined
    }

    const go = () => {
      const id = decodeURIComponent(hash.slice(1))
      const el = document.getElementById(id)

      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      } else if (tries++ < 10) {
        timer = setTimeout(go, 60)
      }
    }

    go()

    // Cleanup timeout when route changes/unmounts
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [pathname, hash])

  return null
}