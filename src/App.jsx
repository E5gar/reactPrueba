import { Routes, Route, Link } from 'react-router-dom'
import Parte1Page from './features/parte1/Parte1Page'
import Parte2Page from './features/parte2/Parte2Page'

export default function App() {
  return (
    <>
      <nav className="flex gap-4 p-4 bg-gray-100">
        <Link to="/parte1">Parte 1</Link>
        <Link to="/parte2">Parte 2</Link>
      </nav>
      <Routes>
        <Route path="/parte1" element={<Parte1Page />} />
        <Route path="/parte2" element={<Parte2Page />} />
      </Routes>
    </>
  )
}
