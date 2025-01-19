import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/navbar/header'
import Footer from './Components/navbar/Footer'
import Services from './Components/Services/Services'
import Patient from './Components/Patient/Patient'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Services />
      <Footer />
      <Patient />
    </>
  )
}

export default App
