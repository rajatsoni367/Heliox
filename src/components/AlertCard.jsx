import { useState } from 'react'

function getBorderColor(product_id = '') {
  const id = product_id.toUpperCase()
  if (id.includes('WARNING'))    return '#ff4d4d'
  if (id.includes('WATCH'))      return '#ff9f40'
  if (id.includes('ALERT'))      return '#ffd166'
  return '#4fc3f7'
}

export default function AlertCard({ alert }) {
  const [expanded, setExpanded] = useState(false)
  const borderColor = getBorderColor(alert.product_id)

  return (
    <div
      onClick={() => setExpanded(e => !e)}
      style={{
        borderRadius: 12, padding: '16px 20px',
        background: 'rgba(255,255,255,0.02)',
        borderLeft: `3px solid ${borderColor}`,
        border: `1px solid rgba(255,255,255,0.07)`,
        borderLeftColor: borderColor,
        cursor: 'pointer', marginBottom: 12,
        transition: 'background 0.2s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div>
          <div style={{ fontFamily: 'Barlow', fontWeight: 600, fontSize: 13, color: borderColor, marginBottom: 4 }}>
            {alert.product_id}
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: 'Barlow' }}>
            {new Date(alert.issue_datetime).toLocaleString()}
          </div>
        </div>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 18, lineHeight: 1 }}>
          {expanded ? '−' : '+'}
        </span>
      </div>
      {expanded && (
        <pre style={{
          marginTop: 12, fontSize: 12, fontFamily: 'monospace',
          color: 'rgba(255,255,255,0.75)', whiteSpace: 'pre-wrap',
          wordBreak: 'break-word', lineHeight: 1.6,
          background: 'rgba(0,0,0,0.4)', padding: '12px 16px',
          borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)',
        }}>
          {alert.message}
        </pre>
      )}
    </div>
  )
}