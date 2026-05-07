import { useState } from 'react'
import AlertCard from '../components/AlertCard'
import SkeletonLoader from '../components/SkeletonLoader'

const FILTERS = ['All', 'Warnings', 'Watches', 'Alerts', 'Summaries']

export default function Alerts({ alertsData, loading }) {
  const [filter, setFilter] = useState('All')

  const sortedAlerts = [...(alertsData || [])].sort((a, b) => new Date(b.issue_datetime) - new Date(a.issue_datetime))
  const filteredAlerts = filter === 'All' 
    ? sortedAlerts 
    : sortedAlerts.filter(a => a.product_id.toUpperCase().includes(filter.toUpperCase().slice(0, -1)))

  return (
    <div className="min-h-screen bg-black pt-24 px-6 md:px-12 max-w-4xl mx-auto">
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTERS.map(f => (
          <button 
            key={f} 
            onClick={() => setFilter(f)}
            className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
            style={{
              background: filter === f ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.04)',
              color: filter === f ? '#fff' : 'rgba(255,255,255,0.6)'
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col gap-4">
          <SkeletonLoader height={80} />
          <SkeletonLoader height={80} />
          <SkeletonLoader height={80} />
        </div>
      ) : filteredAlerts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <div style={{ fontSize: 48 }}>🟢</div>
          <h3 style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 28, color: '#fff', marginTop: 16 }}>
            No Active Alerts
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>Space weather conditions are currently calm.</p>
        </div>
      ) : (
        <div>
          {filteredAlerts.map(alert => (
            <AlertCard key={alert.issue_datetime + alert.product_id} alert={alert} />
          ))}
        </div>
      )}
    </div>
  )
}