import React from 'react'
import '../styles/Navbar.css'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/")
  }
  return (
    <>
      <nav>
        <h1 id="title">Welcome Traders</h1>
        <ul className='navDesktop'>
          <li><NavLink to="/" className={(e) => [e.isActive ? "active" : ""]}>Home</NavLink></li>
          <li><NavLink to="/about" className={(e) => [e.isActive ? "active" : ""]}>About</NavLink></li>
          <li><NavLink to="/admin" className={(e) => [e.isActive ? "active" : ""]}>Admin</NavLink></li>
          {localStorage.getItem("token") && <button id="logOutBtn" onClick={handleLogOut}>
            Log Out
          </button>}
        </ul>
      </nav>
      <Outlet />
    </>
  )
}

export default Navbar
