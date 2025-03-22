import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/admin_assets/assets'
import { Link, NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
          <img src={assets.add_icon} alt="add icon" />
          <p>Add Item</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
          <img src={assets.order_icon} alt="list icon" />
          <p>List Item</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
          <img src={assets.order_icon} alt="order icon" />
          <p>Orders</p>
        </NavLink>
      </div>

    </div>
  )
}

export default Sidebar