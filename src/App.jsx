import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate } from 'react-router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <h1 className='text-3xl border-black rounded-3xl font-extralight'>hello world</h1>
      </div>
    </>
  )
}

export default App
