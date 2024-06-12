import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Admin from './pages/Admin.jsx'
import Navbar from './components/Navbar.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import Login from './pages/Login.jsx'
import Sidebar from './components/Sidebar.jsx'
import Products from './pages/Products.jsx'
import Stock from './pages/Stock.jsx'
import Supplies from './pages/Supplies.jsx'
import Sales from './pages/Sales.jsx'
import AddProduct from './pages/AddProduct.jsx'
import AuthMiddleware from './middleware/AuthMiddleware.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import SupplyDetails from './pages/SupplyDetails.jsx'
import AddSupply from './pages/AddSupply.jsx'
import AddSale from './pages/AddSale.jsx'
import SaleDetails from './pages/SaleDetails.jsx'
import DailySalesReport from './pages/DailySalesReport.jsx'
import MonthlySalesReport from './pages/MonthlySalesReport.jsx'


const router = createBrowserRouter(
    [
        // Add your routes here
        {
            path: "/",
            element: <Navbar />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "",
                    element: <Home />
                },
                {
                    path: "about",
                    element: <About />
                },
                {
                    path: "admin/",
                    element: <>
                        <AuthMiddleware>
                            <Sidebar />
                        </AuthMiddleware>
                    </>,
                    children: [
                        {
                            path: "",
                            element: <Admin />
                        },
                        {
                            path: "products",
                            element: <Products />,
                        },
                        {
                            path: "products/addproduct",
                            element: <AddProduct />
                        },
                        {
                            path: "products/productdetails/:productID",
                            element: <ProductDetails />
                        },
                        {
                            path: "stock",
                            element: <Stock />
                        },
                        {
                            path: "supplies",
                            element: <Supplies />
                        },
                        {
                            path: "supplies/supplydetails/:id",
                            element: <SupplyDetails />
                        },
                        {
                            path: "supplies/addsupply",
                            element: <AddSupply />
                        },
                        {
                            path: "sales",
                            element: <Sales />
                        },
                        {
                            path: "sales/saledetails/:id",
                            element: <SaleDetails />
                        },
                        {
                            path: "sales/addsale",
                            element: <AddSale />
                        },
                        {
                            path: "dailysalesreport",
                            element: <DailySalesReport />
                        },
                        {
                            path: "monthlysalesreport",
                            element: <MonthlySalesReport />
                        }
                    ]
                }
            ]
        },
        {
            path: "admin/login",
            element: <Login />
        }


    ])

export default router;