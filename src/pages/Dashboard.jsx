import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ReferenceArea, ResponsiveContainer } from 'recharts'
import KpiCard from '../components/KpiCard'
import SkeletonLoader from '../components/SkeletonLoader'
import FadingVideo from '../components/FadingVideo'
import { getXrayClass } from '../utils/riskCalculator'

const CAPABILITIES_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4'

export default function Dashboard({ kpData, xrayData, plasmaData, magData, loading }) {
  const currentKp = kpData?.[kpData.length - 1]?.estimated_kp ?? 0
  const currentSpeed = plasmaData?.[plasmaData.length - 1]?.speed ?? 0
  const currentBz = magData?.[magData.length - 1]?.bz_gsm ?? 0
  const currentFlux = xrayData?.[xrayData.length - 1]?.flux ?? 0
  const xrayClass = getXrayClass(currentFlux)

  const formattedKpData = kpData.map(d => ({ ...d, time: new Date(d.time_tag).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }))
  const formattedXrayData = xrayData.map(d => ({ ...d, logFlux: d.flux > 0 ? Math.log10(d.flux) : -9, time: new Date(d.time_tag).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }))
  const formattedPlasmaData = plasmaData.map(d => ({ ...d, time: new Date(d.time_tag).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }))
  const formattedMagData = magData.map(d => ({ ...d, time: new Date(d.time_tag).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }))

  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="px-6 md:px-12 lg:px-16 py-10">
        
        {/* KPI Row */}
        <div className="flex flex-wrap gap-4 mb-10">
          <div className="flex-1 min-w-[200px]"><KpiCard title="Current Kp" value={currentKp} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>} color="#ffd166" loading={loading} /></div>
          <div className="flex-1 min-w-[200px]"><KpiCard title="Solar Wind Speed" value={currentSpeed} unit="km/s" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>} color="#4fc3f7" loading={loading} /></div>
          <div className="flex-1 min-w-[200px]"><KpiCard title="Bz Component" value={currentBz} unit="nT" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 22h16A2 2 0 0 0 22 20V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2z"/><path d="M2 12h20M12 2v20"/></svg>} color={currentBz < 0 ? '#ff4d4d' : '#3ddc84'} loading={loading} /></div>
          <div className="flex-1 min-w-[200px]"><KpiCard title="X-Ray Class" value={xrayClass} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>} color="#ff9f40" loading={loading} /></div>
        </div>

        {/* Charts */}
        {loading ? <SkeletonLoader variant="chart" /> : (
          <>
            <div className="liquid-glass rounded-[16px] p-6 mb-8 border border-white/5">
              <h2 className="font-heading italic text-[22px] text-white mb-4">Kp Index — Last 100 Minutes</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={formattedKpData}>
                  <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="time" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis domain={[0, 9]} stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <ReferenceLine y={4} stroke="#ffd166" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'G1', fill: '#ffd166', fontSize: 12 }} />
                  <ReferenceLine y={7} stroke="#ff4d4d" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'G3', fill: '#ff4d4d', fontSize: 12 }} />
                  <Line type="monotone" dataKey="estimated_kp" stroke="#ffd166" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="liquid-glass rounded-[16px] p-6 mb-8 border border-white/5">
              <h2 className="font-heading italic text-[22px] text-white mb-1">X-Ray Flux (Log Scale)</h2>
              <p className="text-sm text-white/50 mb-4 font-body">(A=−8, B=−7, C=−6, M=−5, X=−4)</p>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={formattedXrayData}>
                  <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="time" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis domain={[-9, -2]} stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => `10^${v}`} />
                  <Tooltip formatter={(val, name, props) => [props.payload.flux.toExponential(2), 'Flux']} />
                  <Line type="monotone" dataKey="logFlux" stroke="#ff9f40" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="liquid-glass rounded-[16px] p-6 border border-white/5">
                <h2 className="font-heading italic text-[22px] text-white mb-4">Solar Wind Speed (km/s)</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={formattedPlasmaData}>
                    <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="time" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis domain={['auto', 'auto']} stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <ReferenceLine y={500} stroke="#ff9f40" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'Elevated', fill: '#ff9f40', fontSize: 12 }} />
                    <Line type="monotone" dataKey="speed" stroke="#4fc3f7" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="liquid-glass rounded-[16px] p-6 border border-white/5">
                <h2 className="font-heading italic text-[22px] text-white mb-1">Bz Component (nT)</h2>
                <p className="text-sm text-white/50 mb-4 font-body">Southward = Negative = Storm Risk</p>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={formattedMagData}>
                    <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="time" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis domain={['auto', 'auto']} stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <ReferenceLine y={0} stroke="rgba(255,255,255,0.3)" />
                    <ReferenceArea y1={-50} y2={0} fill="rgba(255,77,77,0.08)" />
                    <Line type="step" dataKey="bz_gsm" stroke="#cc80ff" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Capabilities Section */}
      <div className="relative min-h-screen">
        <FadingVideo src={CAPABILITIES_VIDEO} className="absolute inset-0 w-full h-full object-cover z-0" />
        <div className="relative z-10 px-8 md:px-16 lg:px-20 pt-24 pb-10 flex flex-col min-h-screen">
          <p className="font-body text-sm text-white/80 uppercase tracking-widest">// Capabilities</p>
          <h2 className="font-heading italic text-[5rem] md:text-[6rem] leading-[0.9] tracking-[-3px] text-white mt-4 whitespace-pre-line">
            {"Monitoring\nevolved"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col">
              <svg className="text-white/60 mb-6" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3v18h18"/><path d="M18 9l-5 5-4-4-4 4"/></svg>
              <div className="text-xs text-white/50 mb-auto flex gap-2"><span className="bg-white/10 px-2 py-1 rounded">Live Kp</span><span className="bg-white/10 px-2 py-1 rounded">Bz Monitor</span></div>
              <h3 className="font-heading italic text-3xl text-white mb-3 mt-4">Real-Time Conditions</h3>
              <p className="text-white/70 text-sm font-light leading-relaxed">Live solar-wind data, Kp index, and X-ray flux updated every 60 seconds directly from NOAA's DSCOVR and GOES satellites.</p>
            </div>
            
            <div className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col">
              <svg className="text-white/60 mb-6" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <div className="text-xs text-white/50 mb-auto flex gap-2"><span className="bg-white/10 px-2 py-1 rounded">Power Grids</span><span className="bg-white/10 px-2 py-1 rounded">Aviation</span></div>
              <h3 className="font-heading italic text-3xl text-white mb-3 mt-4">Impact Intelligence</h3>
              <p className="text-white/70 text-sm font-light leading-relaxed">Automatic sector-level risk scoring translates raw space-weather indices into actionable impact assessments for five critical infrastructure domains.</p>
            </div>

            <div className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col">
              <svg className="text-white/60 mb-6" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 15h18v7H3z"/></svg>
              <div className="text-xs text-white/50 mb-auto flex gap-2"><span className="bg-white/10 px-2 py-1 rounded">3-Day Forecast</span><span className="bg-white/10 px-2 py-1 rounded">G-Scale</span></div>
              <h3 className="font-heading italic text-3xl text-white mb-3 mt-4">Storm Forecasting</h3>
              <p className="text-white/70 text-sm font-light leading-relaxed">3-day Kp forecasts with NOAA G-scale colour mapping help operators anticipate geomagnetic storm windows and prepare mitigation measures.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}