import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import StormBadge from './StormBadge'
import { useTheme } from '../context/ThemeContext'

const LINKS = [
  { label: 'Home',      path: '/'          },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Alerts',    path: '/alerts'    },
  { label: 'Impacts',   path: '/impacts'   },
  { label: 'Forecast',  path: '/forecast'  },
  { label: 'Learn',     path: '/learn'     },
  { label: 'About',     path: '/about'     },
]

export default function Navbar({ scalesData, secondsUntilRefresh }) {
  const { pathname } = useLocation()
  const { theme, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const gScale = scalesData?.G?.Scale ?? 0

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', height: 64,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        {/* Left: Logo + wordmark */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Inline SVG logo — solar corona ring */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="5" fill="white" />
            <circle cx="16" cy="16" r="10" stroke="white" strokeWidth="1.2" strokeDasharray="3 2" fill="none" />
            <circle cx="16" cy="16" r="14" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" fill="none" />
            {[0,45,90,135,180,225,270,315].map((deg, i) => {
              const r = 14, angle = (deg * Math.PI) / 180
              const x1 = 16 + r * Math.cos(angle)
              const y1 = 16 + r * Math.sin(angle)
              const x2 = 16 + (r+4) * Math.cos(angle)
              const y2 = 16 + (r+4) * Math.sin(angle)
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
            })}
          </svg>
          <span style={{
            fontFamily: "'Instrument Serif', serif", fontStyle: 'italic',
            fontSize: 22, color: '#fff', letterSpacing: '-0.5px',
          }}>Heliox</span>
        </Link>

        {/* Center: nav links (desktop only) */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}
             className="hidden-mobile">
          {LINKS.map(l => (
            <Link key={l.path} to={l.path} style={{
              padding: '6px 14px', borderRadius: 9999,
              fontSize: 13, fontFamily: 'Barlow', fontWeight: 500,
              color: pathname === l.path ? '#fff' : 'rgba(255,255,255,0.6)',
              background: pathname === l.path ? 'rgba(255,255,255,0.1)' : 'transparent',
              transition: 'all 0.2s',
            }}>{l.label}</Link>
          ))}
        </div>

        {/* Right: Storm badge + countdown + theme toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <StormBadge scale={parseInt(gScale)} label="G" />
          <span style={{ fontSize: 12, fontFamily: 'Barlow', color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap' }}>
            Refresh in {secondsUntilRefresh}s
          </span>
          <button onClick={toggle} style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'rgba(255,255,255,0.7)', fontSize: 16,
          }}>
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="show-mobile"
            style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              display: 'none', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 18,
            }}>☰</button>
        </div>
      </nav>

      {/* Mobile slide-in menu overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.97)',
          backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column',
          padding: '80px 32px 32px',
        }}>
          <button onClick={() => setMenuOpen(false)} style={{
            position: 'absolute', top: 20, right: 24,
            fontSize: 28, color: '#fff', background: 'none', border: 'none', cursor: 'pointer',
          }}>✕</button>
          {LINKS.map(l => (
            <Link key={l.path} to={l.path}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: '16px 0', fontSize: 28,
                fontFamily: "'Instrument Serif', serif", fontStyle: 'italic',
                color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.07)',
              }}>
              {l.label}
            </Link>
          ))}
        </div>
      )}

      {/* CSS for show/hide on mobile */}
      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
      `}</style>
    </>
  )
}