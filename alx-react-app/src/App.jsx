import { useState } from 'react'
import './App.css'
import WelcomeMessage from './components/WelcomeMessage.jsx'
import Header from './components/Header.jsx'
import MainContent from './components/MainContent.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<div>
  <WelcomeMessage />
  <Header />
  <MainContent />
  <Footer />
</div>
    </>
  )
}

export default App
