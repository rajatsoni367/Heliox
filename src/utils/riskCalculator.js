export function getRiskLevel(kp) {
  if (kp <= 3) return { level: 'Low',      color: '#3ddc84' }
  if (kp <= 4) return { level: 'Moderate', color: '#ffd166' }
  if (kp <= 6) return { level: 'High',     color: '#ff9f40' }
  if (kp <= 7) return { level: 'Severe',   color: '#ff4d4d' }
  return           { level: 'Extreme',    color: '#cc0000' }
}

export function getGPSRisk(kp, bz) {
  if (bz < -10 && kp >= 4) return { level: 'Severe', color: '#ff4d4d' }
  return getRiskLevel(kp)
}

export function getXrayClass(flux) {
  if (!flux || flux <= 0) return 'A'
  if (flux < 1e-7) return 'A'
  if (flux < 1e-6) return 'B'
  if (flux < 1e-5) return 'C'
  if (flux < 1e-4) return 'M'
  return 'X'
}

export function getXrayRisk(flux) {
  const cls = getXrayClass(flux)
  if (cls === 'A' || cls === 'B') return { level: 'Low',      color: '#3ddc84' }
  if (cls === 'C')                return { level: 'Moderate', color: '#ffd166' }
  if (cls === 'M')                return { level: 'High',     color: '#ff9f40' }
  return                               { level: 'Severe',   color: '#ff4d4d' }
}