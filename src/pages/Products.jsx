import React, { useEffect, useMemo, useState } from 'react'
import Table from '../components/Table'
import "../styles/Products.css"
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../features/products/productsSlice'
import Loader from "../components/Loader"
import { Link } from 'react-router-dom'



const Products = () => {

  const dispatch = useDispatch();

  const { data, isLoading, error } = useSelector((state) => state.products);


  useMemo(() => {
    dispatch(getProducts());
  }, [dispatch])

  const [filteredData, setFilteredData] = useState(null)

  const filterInputOnChange = (e) => {
    const { value } = e.target;
    const filteredData = data.filter((product) => product.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredData(filteredData);
  }

  const columns = useMemo(() => [
    {
      Header: "Name",
      accessor: "name"
    },
    {
      Header: "Pieces / Ctn",
      accessor: "piecesInCtn"
    },
    {
      Header: "MRP Ctn Price",
      accessor: "mrpCtnPrice"
    },
    {
      Header: "Sale Ctn Price",
      accessor: "sellingCtnPrice"
    },
    {
      Header: "MRP Item Price",
      accessor: "mrpItemPrice"
    },
    {
      Header: "Sale Item Price",
      accessor: "sellingItemPrice"
    },
    {
      Header: "Profit / Item",
      accessor: "profitPerItem"
    },
    {
      Header: "Profit / Ctn",
      accessor: "profitPerCtn"
    },
  ]);

  const dataTypesTable = ["Name", "Pieces / Ctn", "MRP Ctn Price", "Selling Ctn Price", "MRP Item Price", "Selling Item Price", "Profit / Item", "Profit / Ctn"];

  return (
    isLoading ? (<Loader />) :
      (
        <section id='productsSection'>
          <h2>Products</h2>
          {/* If there is error show error message else show table */}
          {error ? <p className="errorMessage">{error}</p> :
            (
              <>
                <p>Total Products: <span style={{ fontWeight: "bold" }}>{filteredData ? filteredData.length : data.length}</span></p>
                <input type="search" placeholder='Enter product name to search' className='searchProductInput' onChange={filterInputOnChange} />
                {data.length === 0 ? <p>No product found <Link to='/admin/products/addproduct' style={{ textDecoration: "underline" }}>Create a product</Link></p> : <Table columns={columns} data={filteredData ?? data} link="productdetails" dataTypes={dataTypesTable} />}
              </>
            )}
          <Link to="addproduct"><button id="addProductBtn">Add product</button></Link>
        </section>))
}

export default Products
