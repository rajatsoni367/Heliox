import { useState } from 'react'

function AccordionItem({ title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      padding: '0 0 4px',
    }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', textAlign: 'left',
        padding: '18px 0', display: 'flex', justifyContent: 'space-between',
        fontFamily: "'Instrument Serif', serif", fontStyle: 'italic',
        fontSize: 20, color: '#fff', background: 'none', border: 'none', cursor: 'pointer',
      }}>
        {title}
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 24, fontStyle: 'normal' }}>
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div style={{ padding: '0 0 20px', color: 'rgba(255,255,255,0.7)', fontFamily: 'Barlow', fontSize: 14, lineHeight: 1.8 }}>
          {children}
        </div>
      )}
    </div>
  )
}

export default function Learn() {
  return (
    <div className="min-h-screen bg-black pt-24 px-6 md:px-12 max-w-4xl mx-auto pb-20">
      <h1 className="font-heading italic text-5xl text-white mb-10">Learn Space Weather</h1>
      
      <AccordionItem title="1. What is Space Weather?">
        Space weather refers to the variable conditions on the Sun, in the solar wind, and within Earth's magnetosphere, ionosphere, and thermosphere. It encompasses solar flares, coronal mass ejections (CMEs), solar energetic particles, and geomagnetic storms — all driven by the Sun's magnetic activity.
      </AccordionItem>

      <AccordionItem title="2. What is the Kp Index?">
        The Planetary K-index (Kp) is a global measure of geomagnetic activity, ranging from 0 (quiet) to 9 (extreme storm). It is derived from the largest magnetic variation recorded at 13 globally distributed observatories. Kp ≥ 5 indicates a geomagnetic storm.
      </AccordionItem>

      <AccordionItem title="3. What are CMEs and Solar Flares?">
        Solar flares are sudden explosions of electromagnetic energy from the Sun's surface, releasing X-rays and UV radiation. CMEs are massive eruptions of magnetised plasma that, if Earth-directed, can drive intense geomagnetic storms hours to days after leaving the Sun.
      </AccordionItem>

      <AccordionItem title="4. NOAA G-Scale Table (Geomagnetic Storms)">
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white">
                <th className="py-2 px-3">Scale</th>
                <th className="py-2 px-3">Name</th>
                <th className="py-2 px-3">Kp</th>
                <th className="py-2 px-3">Power Effects</th>
                <th className="py-2 px-3">Satellite Effects</th>
              </tr>
            </thead>
            <tbody>
              {[['G1', 'Minor', '5', 'Weak power fluctuations', 'Minor orientation effects'],
                ['G2', 'Moderate', '6', 'High-latitude systems affected', 'Corrective actions required'],
                ['G3', 'Strong', '7', 'Voltage corrections required', 'Satellite drag increases'],
                ['G4', 'Severe', '8-9', 'Widespread control problems', 'Surface charging'],
                ['G5', 'Extreme', '9+', 'Complete collapse possible', 'Extensive anomalies']].map((row, i) => (
                <tr key={row[0]} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent' }}>
                  {row.map(cell => <td key={cell} className="py-2 px-3 border-b border-white/5">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AccordionItem>

      <AccordionItem title="5. NOAA S-Scale Table (Solar Radiation)">
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white">
                <th className="py-2 px-3">Scale</th>
                <th className="py-2 px-3">Name</th>
                <th className="py-2 px-3">HF Radio</th>
                <th className="py-2 px-3">Satellite Effects</th>
              </tr>
            </thead>
            <tbody>
              {[['S1', 'Minor', 'Minor degradation', 'Minor'],
                ['S2', 'Moderate', 'Limited blackouts', 'Spacecraft charging'],
                ['S3', 'Strong', 'Wide-area blackouts', 'Increased anomalies'],
                ['S4', 'Severe', 'Degraded to blackout', 'Memory upsets'],
                ['S5', 'Extreme', 'Complete blackout', 'Failures possible']].map((row, i) => (
                <tr key={row[0]} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent' }}>
                  {row.map(cell => <td key={cell} className="py-2 px-3 border-b border-white/5">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AccordionItem>

      <AccordionItem title="6. NOAA R-Scale Table (Radio Blackouts)">
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white">
                <th className="py-2 px-3">Scale</th>
                <th className="py-2 px-3">Class</th>
                <th className="py-2 px-3">HF Blackout</th>
                <th className="py-2 px-3">Duration</th>
              </tr>
            </thead>
            <tbody>
              {[['R1', 'M1', 'Minor degradation', 'Minutes'],
                ['R2', 'M5', 'Limited blackout', 'Minutes'],
                ['R3', 'X1', 'Wide-area blackout', 'Up to 1 hr'],
                ['R4', 'X10', 'Most of sunlit side', '1–2 hrs'],
                ['R5', 'X20+', 'Full sunlit side', 'Hours']].map((row, i) => (
                <tr key={row[0]} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent' }}>
                  {row.map(cell => <td key={cell} className="py-2 px-3 border-b border-white/5">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AccordionItem>

    </div>
  )
}