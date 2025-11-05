import { useState } from 'react'
import './App.css'
import WelcomeMessage from './components/WelcomeMessage.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
  <WelcomeMessage/>

  )
}

export default App
