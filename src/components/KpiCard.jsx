import { useEffect, useRef, useState } from 'react'
import SkeletonLoader from './SkeletonLoader'

export default function KpiCard({ title, value, unit = '', icon, color = '#4fc3f7', loading = false }) {
  const [display, setDisplay] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (loading || isNaN(value)) return
    const target   = parseFloat(value)
    const start    = performance.now()
    const duration = 600
    const from     = display
    cancelAnimationFrame(rafRef.current)
    function step(now) {
      const t = Math.min((now - start) / duration, 1)
      setDisplay(from + (target - from) * t)
      if (t < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [value, loading])

  if (loading) return <SkeletonLoader variant="card" height={110} />

  return (
    <div className="liquid-glass" style={{
      borderRadius: 16, padding: '20px 24px',
      display: 'flex', flexDirection: 'column', gap: 8,
      minWidth: 160,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>
        {icon && <span style={{ color }}>{icon}</span>}
        {title}
      </div>
      <div style={{
        fontFamily: "'Instrument Serif', serif", fontStyle: 'italic',
        fontSize: 36, color: '#fff', lineHeight: 1,
        letterSpacing: '-1px',
      }}>
        {typeof display === 'number' ? display.toFixed(1) : display}
        <span style={{ fontSize: 14, fontFamily: 'Barlow', fontStyle: 'normal', marginLeft: 4, color: 'rgba(255,255,255,0.5)' }}>{unit}</span>
      </div>
    </div>
  )
}