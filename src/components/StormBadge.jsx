const SCALE_COLORS = {
  0: '#6b7280',
  1: '#3ddc84',
  2: '#ffd166',
  3: '#ff9f40',
  4: '#ff4d4d',
  5: '#cc0000',
}
const SCALE_LABELS = {
  0: 'None', 1: 'Minor', 2: 'Moderate', 3: 'Strong', 4: 'Severe', 5: 'Extreme'
}

export default function StormBadge({ scale = 0, label = 'G' }) {
  const color = SCALE_COLORS[scale] || SCALE_COLORS[0]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      padding: '4px 12px', borderRadius: '9999px',
      background: `${color}22`, border: `1px solid ${color}55`,
      fontSize: '12px', fontFamily: 'Barlow, sans-serif',
      fontWeight: 500, color: color, whiteSpace: 'nowrap',
    }}>
      <span style={{
        width: 7, height: 7, borderRadius: '50%',
        background: color, display: 'inline-block',
        boxShadow: `0 0 6px ${color}`,
      }} />
      {label}{scale} · {SCALE_LABELS[scale] || 'Unknown'}
    </span>
  )
}