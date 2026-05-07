import { useEffect, useRef } from 'react'

const FADE_MS = 500
const FADE_OUT_LEAD = 0.55

export default function FadingVideo({ src, className, style }) {
  const videoRef = useRef(null)
  const rafRef   = useRef(null)
  const fadingOutRef = useRef(false)

  function fadeTo(video, target, duration) {
    cancelAnimationFrame(rafRef.current)
    const startTime  = performance.now()
    const startOpacity = parseFloat(video.style.opacity) || 0
    function step(now) {
      const elapsed  = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      video.style.opacity = startOpacity + (target - startOpacity) * progress
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      }
    }
    rafRef.current = requestAnimationFrame(step)
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    function onLoadedData() {
      video.style.opacity = '0'
      video.play().catch(() => {})
      fadeTo(video, 1, FADE_MS)
    }

    function onTimeUpdate() {
      if (!fadingOutRef.current && video.duration > 0) {
        const remaining = video.duration - video.currentTime
        if (remaining <= FADE_OUT_LEAD && remaining > 0) {
          fadingOutRef.current = true
          fadeTo(video, 0, FADE_MS)
        }
      }
    }

    function onEnded() {
      video.style.opacity = '0'
      setTimeout(() => {
        video.currentTime = 0
        video.play().catch(() => {})
        fadingOutRef.current = false
        fadeTo(video, 1, FADE_MS)
      }, 100)
    }

    video.style.opacity = '0'
    video.addEventListener('loadeddata', onLoadedData)
    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('ended',      onEnded)

    return () => {
      cancelAnimationFrame(rafRef.current)
      video.removeEventListener('loadeddata', onLoadedData)
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('ended',      onEnded)
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      playsInline
      preload="auto"
      loop={false}
      className={className}
      style={{ ...style, opacity: 0 }}
    />
  )
}