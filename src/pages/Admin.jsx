import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import "../styles/Admin.css"

const authToken = localStorage.getItem("token");

const Admin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // if (!authToken) navigate("/admin/login")
    document.title = "Company name - Admin"
  }, [])

  return (
    <section className='adminSection'>
      <h2>Welcome to Admin section</h2>
      <p>This is the admin dashboard
        where you can manage all aspects of your store
        such as products, stock, sales and supplies. You can even generate bill for a particular sale at any time.</p>
      <div className="cardsDiv">
        <Link to="./products">
          <div className="card productsCard">
            <p>Products List</p>
            <span className="material-symbols-outlined">
              category
            </span>
          </div>
        </Link>
        <Link to="./stock">
          <div className="card stockCard">
            <p>Stock</p>
            <span className="material-symbols-outlined">
              inventory_2
            </span>
          </div>
        </Link>
        <Link to="./supplies">
          <div className="card suppliesCard">
            <p>Supplies</p>
            <span className="material-symbols-outlined">
              forklift
            </span>
          </div>
        </Link>
        <Link to="./sales">
          <div className="card salesCard">
            <p>Sales</p>
            <span className="material-symbols-outlined">
              shop_two
            </span>
          </div>
        </Link>
        <Link to="./dailysalesreport">
          <div className="card salesReportCard">
            <p>Daily Sales Report</p>
            <span className="material-symbols-outlined">
              lab_profile
            </span>
          </div>
        </Link>
        <Link to="./monthlysalesreport">
          <div className="card monthlyReportCard">
            <p>Monthly Sales Report</p>
            <span className="material-symbols-outlined">
              lab_profile
            </span>
          </div>
        </Link>
      </div>
    </section>
  )
}

export default Admin
