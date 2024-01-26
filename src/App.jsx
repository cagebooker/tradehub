import { lazy, Suspense/*useState*/ } from 'react'
import { Routes, Route } from "react-router-dom"
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import NotFound from './pages/Notfound'
import Sidebar from './components/Sidebar'

// import Drawer from './components/Drawer'
import './App.css'

const TradeRecord = lazy(() => import("./pages/TradeRecord"));

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/" element={<TradeRecord/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
  )
}

export default App
