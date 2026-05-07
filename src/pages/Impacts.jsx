import { getRiskLevel, getGPSRisk, getXrayRisk } from '../utils/riskCalculator'
import StormBadge from '../components/StormBadge'

export default function Impacts({ kpData, magData, xrayData }) {
  const latestKp = kpData?.[kpData.length - 1]?.estimated_kp ?? 0
  const latestBz = magData?.[magData.length - 1]?.bz_gsm ?? 0
  const latestFlux = xrayData?.[xrayData.length - 1]?.flux ?? 0

  const impacts = [
    {
      sector: 'Power Grids', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
      risk: getRiskLevel(latestKp),
      desc: "Geomagnetically induced currents (GICs) can saturate transformers and collapse grid sections. Risk increases significantly above Kp 5."
    },
    {
      sector: 'Aviation', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-.5-.5-2.5 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.7l-1.2 3.6L9 14l-4.2 3.1c-.2.1-.5.2-.8.1l-2.4-.6c-.4-.1-.7.2-.8.5L0 19l4.5 2.5L7 24l1.9-.8c.3-.1.6-.5.5-.8l-.6-2.4c-.1-.3 0-.6.1-.8L10 15l3.5 6.5c.3 1.1.6 1.5 1.1 1.5.5 0 .9-.5 1-1l-1.2-3.6c-.2-.5.1-.9.7-1.1l8.2-1.8c1.1-.2 1.5-.6 1.5-1.1 0-.5-.5-.9-1-1l-3.6 1.2c-.5.2-.9-.1-1.1-.7z"/></svg>,
      risk: getRiskLevel(latestKp),
      desc: "High-latitude flights may experience HF radio blackouts and GNSS degradation, forcing reroutes and altitude changes."
    },
    {
      sector: 'GPS / GNSS', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
      risk: getGPSRisk(latestKp, latestBz),
      desc: "Ionospheric scintillation and TEC disturbances degrade positioning accuracy. Southward Bz amplifies storm intensity and GPS risk."
    },
    {
      sector: 'HF Radio', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 10.4a11 11 0 0 1 16 0M2 14.8a15 15 0 0 1 20 0M12 20v-2M12 14v-2"/></svg>,
      risk: getXrayRisk(latestFlux),
      desc: "Solar X-ray flux causes sudden ionospheric disturbances on the dayside, causing HF radio blackouts from minutes to hours."
    },
    {
      sector: 'Satellite Ops', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
      risk: getRiskLevel(latestKp),
      desc: "Radiation belt enhancements and surface charging from energetic particles can cause anomalies and damage onboard electronics."
    }
  ]

  return (
    <div className="min-h-screen bg-black pt-24 px-6 md:px-12 max-w-5xl mx-auto pb-20">
      <h1 className="font-heading italic text-5xl text-white mb-10">Sector Impacts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {impacts.map(item => (
          <div key={item.sector} className="liquid-glass p-6 rounded-[16px]" style={{ borderLeft: `3px solid ${item.risk.color}`, boxShadow: `0 0 20px ${item.risk.color}22` }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3 text-white font-semibold text-lg">
                <span style={{ color: item.risk.color }}>{item.icon}</span>
                {item.sector}
              </div>
              <StormBadge scale={item.risk.level === 'Low' ? 1 : item.risk.level === 'Moderate' ? 2 : item.risk.level === 'High' ? 3 : item.risk.level === 'Severe' ? 4 : 5} label="" />
            </div>
            <p className="text-[13px] text-white/70 font-light leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}