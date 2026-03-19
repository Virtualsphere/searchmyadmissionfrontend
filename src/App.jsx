import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LLBPage from './pages/LLBPage'
import BCABBAPage from './pages/BCABBAPage'
import BTECHPage from './pages/BTECHPage'
import Header from './component/Header'
import Footer from './component/Footer'
import UnlockPage from './pages/UnlockPage'
import Predictor from './pages/Predictor'
import './App.css'

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Predictor />} />
        <Route path='/unlock' element={<UnlockPage />} />
      </Routes>
    <Footer />
    </BrowserRouter>
  )
}

export default App
