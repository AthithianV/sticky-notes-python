import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './components/Layout/AuthLayout'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {

  return (
    <div>
      <Routes>
        <Route path="/auth" element={<AuthLayout/>}>
            <Route path={"register"} element={<Register />} />
            <Route path={"login"} element={<Login />} />
        </Route>
        <Route path="/" element={<Dashboard />}/>
      </Routes>
      {/* // <section className='p-4 h-[var(--body-height)] flex gap-2 flex-wrap'>
      //   <StickyNotes/>
      //   <StickyNotes/>
      // </section> */}
    </div>
  )
}

export default App
