import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './user/login'
import Medicine from './medicine/medicine'
import MedicineCreate from '@medicine/CUD/create'
function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/medicine" element={<Medicine/>} />
          <Route path='/medicine/create' element={<MedicineCreate/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
