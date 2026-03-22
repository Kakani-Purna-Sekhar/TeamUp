import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Register } from './pages/Register'
import { Teammates } from './pages/Teammates'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="teammates" element={<Teammates />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
