import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import "../styles/Sidebar.css"

const Sidebar = () => {
    return (
        <>
            <aside>
                <div className="sidebarNav">
                    <ul>
                        <li><NavLink to="./" className={(e) => [e.isActive ? "active" : ""]}>Admin</NavLink></li>
                        <li><NavLink to="./products" className={(e) => [e.isActive ? "active" : ""]}>Products</NavLink></li>
                        <li><NavLink to="./stock" className={(e) => [e.isActive ? "active" : ""]}>Stock</NavLink></li>
                        <li><NavLink to="./supplies" className={(e) => [e.isActive ? "active" : ""]}>Supplies</NavLink></li>
                        <li><NavLink to="./sales" className={(e) => [e.isActive ? "active" : ""]}>Sales</NavLink></li>
                        <li><NavLink to="./dailysalesreport" className={(e) => [e.isActive ? "active" : ""]}>Daily Sales Report</NavLink></li>
                        <li><NavLink to="./monthlysalesreport" className={(e) => [e.isActive ? "active" : ""]}>Monthly Sales Report</NavLink></li>
                    </ul>
                </div>
                <Outlet />
            </aside>
        </>
    )
}

export default Sidebar
