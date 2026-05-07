import { useEffect, useRef, useState } from 'react'

const ENDPOINTS = {
  kp:       'https://services.swpc.noaa.gov/json/planetary_k_index_1m.json',
  alerts:   'https://services.swpc.noaa.gov/products/alerts.json',
  xray:     'https://services.swpc.noaa.gov/json/goes/secondary/xrays-6-hour.json',
  mag:      'https://services.swpc.noaa.gov/products/solar-wind/mag-5-minute.json',
  plasma:   'https://services.swpc.noaa.gov/products/solar-wind/plasma-5-minute.json',
  scales:   'https://services.swpc.noaa.gov/products/noaa-scales.json',
  forecast: 'https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json',
}

function filterValid(arr, key) {
  if (!Array.isArray(arr)) return []
  return arr.filter(d => d[key] !== null && d[key] !== '-1' && d[key] !== undefined)
}

function parseNoaaArray(arr) {
  if (!Array.isArray(arr) || arr.length < 2) return []
  const headers = arr[0]
  return arr.slice(1).map(row => {
    const obj = {}
    headers.forEach((h, i) => {
      obj[h] = row[i]
    })
    return obj
  })
}

export function useSpaceWeather() {
  const [state, setState] = useState({
    kpData: [], alertsData: [], xrayData: [],
    magData: [], plasmaData: [], scalesData: null,
    forecastData: [], loading: true, error: null,
  })
  const [secondsUntilRefresh, setSecondsUntilRefresh] = useState(60)
  const intervalRef = useRef(null)
  const countdownRef = useRef(null)

  async function fetchAll() {
    try {
      const [kp, alerts, xray, mag, plasma, scales, forecast] = await Promise.all(
        Object.values(ENDPOINTS).map(url => fetch(url).then(r => r.json()))
      )
      setState({
        kpData:       filterValid(kp, 'estimated_kp').slice(-100),
        alertsData:   Array.isArray(alerts) ? alerts : [],
        xrayData:     filterValid(xray, 'flux').filter(d => d.energy === '0.1-0.8nm').slice(-72),
        magData:      filterValid(parseNoaaArray(mag), 'bz_gsm').slice(-72),
        plasmaData:   filterValid(parseNoaaArray(plasma), 'speed').slice(-72),
        scalesData:   scales,
        forecastData: Array.isArray(forecast)
                        ? forecast.filter(d => d.observed === 'predicted' || d.observed === 'estimated')
                        : [],
        loading: false,
        error: null,
      })
      setSecondsUntilRefresh(60)
    } catch (err) {
      setState(prev => ({ ...prev, loading: false, error: 'Failed to load space weather data. Retrying...' }))
    }
  }

  useEffect(() => {
    fetchAll()
    intervalRef.current = setInterval(fetchAll, 60000)
    countdownRef.current = setInterval(() => {
      setSecondsUntilRefresh(s => (s > 0 ? s - 1 : 60))
    }, 1000)
    return () => {
      clearInterval(intervalRef.current)
      clearInterval(countdownRef.current)
    }
  }, [])

  return { ...state, secondsUntilRefresh }
}