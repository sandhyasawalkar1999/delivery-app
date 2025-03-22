import React from 'react'
import Navbar from './componets/Navbar/Navbar'
import Sidebar from './componets/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './Pages/Add/Add.jsx'
import List from './Pages/List/List.jsx'
import Order from './Pages/Orders/Order.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const App = () => {
  const url = "https://delivery-app-wxc1.onrender.com"
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path='/add' element={<Add url={url} />} />
          <Route path='/list' element={<List url={url} />} />
          <Route path='/orders' element={<Order url={url} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App