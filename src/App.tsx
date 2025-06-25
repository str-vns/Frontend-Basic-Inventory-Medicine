import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Login from './user/login'
import Medicine from './medicine/medicine'
import MedicineCreate from '@/medicine/CUD/create'
import MedicineUpdate from '@/medicine/CUD/update'
import DashBoard from '@/dashboard/index'
import InventoryView from '@/inventory/viewInventory'
import { usePersistUser } from '@/api/user/Api_user'
function App() {
  const isAuth = usePersistUser((state) => state.isAuth);
 console.log("isAuth", isAuth);
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={
            isAuth ? <Navigate to="/dashboard" replace /> : 
          <Login />
          } />
          <Route path="/medicine" element={<Medicine/>} />
          <Route path='/medicine/create' element={<MedicineCreate/>} />
          <Route path='/medicine/update/:id' element={<MedicineUpdate/>} />
          <Route path="/dashboard" element={<DashBoard/>} />
          <Route path='/inventory' element={<Medicine isInventory={true} />} />
          <Route path='/inventory/view/:id' element={<InventoryView />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
