import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import FadingVideo from '../components/FadingVideo'
import StormBadge from '../components/StormBadge'
import KpiCard from '../components/KpiCard'
import BlurText from '../components/BlurText'

const HERO_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4'

export default function Home({ kpData, scalesData, alertsData }) {
  const navigate = useNavigate()

  const currentKp = kpData?.[kpData.length - 1]?.estimated_kp ?? 0
  const gScale = scalesData?.G?.Scale ?? 0
  const alertsCount = alertsData?.length ?? 0

  let arcColor = '#3ddc84'
  if (currentKp > 3) arcColor = '#ffd166'
  if (currentKp > 5) arcColor = '#ff9f40'
  if (currentKp > 7) arcColor = '#ff4d4d'

  const dashOffset = 314 - (314 * Math.min(currentKp, 9)) / 9

  return (
    <div style={{ position: 'relative', minHeight: '100dvh', background: '#000', overflow: 'hidden' }}>
      <FadingVideo src={HERO_VIDEO} className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0" style={{ width: '120%', height: '120%' }} />

      <div className="relative z-10 flex flex-col items-center min-h-screen pt-24 px-4 md:px-8">
        
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
          className="liquid-glass rounded-full flex items-center p-1 pr-4 mb-6 mt-8"
        >
          <span className="bg-white text-black px-3 py-1 text-xs font-semibold rounded-full mr-3">Live</span>
          <span className="text-sm text-white/90">Heliox — Real-Time Space Weather Intelligence</span>
        </motion.div>

        <BlurText text="Track the Sun. Protect the Grid." className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] max-w-3xl tracking-[-4px] text-center" />

        <motion.p
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
          className="text-sm md:text-base text-white/80 max-w-2xl text-center font-body font-light leading-tight mt-6"
        >
          Real-time monitoring of solar flares, geomagnetic storms, and their cascading effects on power grids, satellites, aviation, and GPS systems worldwide.
        </motion.p>

        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 1.1 }}
          className="flex items-center gap-6 mt-8"
        >
          <button onClick={() => navigate('/dashboard')} className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-white flex items-center gap-2">
            Open Dashboard
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </button>
          <button onClick={() => navigate('/alerts')} className="text-sm font-medium text-white flex items-center gap-2">
            View Alerts
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="6 4 20 12 6 20 6 4" />
            </svg>
          </button>
        </motion.div>

        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 1.3 }}
          className="flex flex-wrap justify-center items-stretch gap-4 mt-12"
        >
          <KpiCard
            title="Current Kp Index" value={currentKp} color="#ffd166"
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>}
          />
          <KpiCard
            title="G-Scale Storm Level" value={gScale} color="#ff4d4d"
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>}
          />
          <KpiCard
            title="Active Alerts" value={alertsCount} color="#ff9f40"
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>}
          />
        </motion.div>

        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 1.5 }}
          className="mt-12 flex flex-col items-center"
        >
          <svg width="200" height="120" viewBox="0 0 200 120">
            <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" strokeLinecap="round" />
            <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke={arcColor} strokeWidth="12" strokeLinecap="round"
                  strokeDasharray="314" strokeDashoffset={dashOffset} />
            <text x="100" y="85" fill="#fff" fontSize="40" fontFamily="'Instrument Serif', serif" fontStyle="italic" textAnchor="middle">{parseFloat(currentKp).toFixed(1)}</text>
            <text x="100" y="110" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="'Barlow', sans-serif" textAnchor="middle">Planetary K-index</text>
          </svg>
        </motion.div>

        <div className="flex-grow" />

        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 1.4 }}
          className="flex flex-col items-center gap-6 pb-12 w-full mt-12"
        >
          <div className="liquid-glass rounded-full px-5 py-2 text-xs text-white/60">
            Powered by NOAA SWPC · NASA DONKI · ESA Space Weather
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-2xl font-heading italic text-white/80 tracking-tight">
            <span>ACE</span>
            <span>DSCOVR</span>
            <span>GOES</span>
            <span>SDO</span>
            <span>STEREO</span>
          </div>
        </motion.div>

      </div>
    </div>
  )
}