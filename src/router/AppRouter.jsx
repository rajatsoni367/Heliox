import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import Alerts from '../pages/Alerts'
import Impacts from '../pages/Impacts'
import Forecast from '../pages/Forecast'
import Learn from '../pages/Learn'
import About from '../pages/About'
import { useSpaceWeather } from '../hooks/useSpaceWeather'

export default function AppRouter() {
  const swData = useSpaceWeather()

  return (
    <BrowserRouter>
      <Navbar scalesData={swData.scalesData} secondsUntilRefresh={swData.secondsUntilRefresh} />
      <Routes>
        <Route path="/"          element={<Home {...swData} />} />
        <Route path="/dashboard" element={<Dashboard {...swData} />} />
        <Route path="/alerts"    element={<Alerts {...swData} />} />
        <Route path="/impacts"   element={<Impacts {...swData} />} />
        <Route path="/forecast"  element={<Forecast {...swData} />} />
        <Route path="/learn"     element={<Learn />} />
        <Route path="/about"     element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}