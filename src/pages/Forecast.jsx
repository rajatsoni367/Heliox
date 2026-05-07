import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts'
import SkeletonLoader from '../components/SkeletonLoader'

function getKpBarColor(kp) {
  if (kp <= 3) return '#3ddc84'
  if (kp <= 4) return '#ffd166'
  if (kp <= 6) return '#ff9f40'
  if (kp <= 7) return '#ff4d4d'
  return '#cc0000'
}

const CustomBar = (props) => {
  const { x, y, width, height, kp } = props
  const color = getKpBarColor(kp)
  return <rect x={x} y={y} width={width} height={height} fill={color} rx={4} />
}

export default function Forecast({ forecastData, loading }) {
  const formattedData = forecastData.slice(-72).map(d => ({
    time: new Date(d.time_tag).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }),
    kp: parseFloat(d.kp),
  }))

  return (
    <div className="min-h-screen bg-black pt-24 px-6 md:px-12 pb-20">
      <h1 className="font-heading italic text-5xl text-white mb-10">3-Day Kp Forecast</h1>
      
      {loading ? <SkeletonLoader variant="chart" height={400} /> : (
        <div className="liquid-glass rounded-[16px] p-6 border border-white/5">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={formattedData}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} axisLine={false} angle={-35} textAnchor="end" height={60} />
              <YAxis domain={[0, 9]} stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} label={{ value: 'Kp', angle: -90, position: 'insideLeft', fill: 'rgba(255,255,255,0.4)' }} />
              <Tooltip cursor={{ fill: 'rgba(255,255,255,0.1)' }} />
              <ReferenceLine y={4} stroke="#ffd166" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'G1', fill: '#ffd166', fontSize: 12 }} />
              <ReferenceLine y={7} stroke="#ff4d4d" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'G3', fill: '#ff4d4d', fontSize: 12 }} />
              <Bar dataKey="kp" shape={<CustomBar />} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}