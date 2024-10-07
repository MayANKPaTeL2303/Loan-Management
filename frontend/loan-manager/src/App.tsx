import Form from './component/Form/Form'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {

  return (
    <>
    <BrowserRouter>
    <div>
    <Routes>
      <Route path='/' element={<div><Form/></div>}/>
      <Route path='/dashboard' element={<div><Dashboard/></div>}/>
    </Routes>
    </div>
    </BrowserRouter>
    </>
  )
}

export default App
