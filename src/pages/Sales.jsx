import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Table from '../components/Table'
import { getSales } from '../features/sales/saleSlice'
import "../styles/Sales.css"


const Sales = () => {
  const dispatch = useDispatch()

  const { data, error, isLoading } = useSelector((state) => state.sale)

  const [filteredData, setFilteredData] = useState(null)

  useMemo(() => {
    dispatch(getSales())
  }, [dispatch])

  const filterInputOnChange = (e) => {
    const { value } = e.target;
    const filteredData = data.filter((sale) => {
      return sale.invoiceNo.toString().includes(value.toLowerCase());
    })
    setFilteredData(filteredData)
  }

  const columns = useMemo(() => [
    {
      Header: "No.",
      accessor: "invoiceNo"
    },
    {
      Header: "Address",
      accessor: "deliveredTo"
    },
    {
      Header: "Total Amount",
      accessor: "totalAmount"
    },
    {
      Header: "Date",
      accessor: "date"
    },
  ]);

  const dataTypesTable = ["No", "Address", "Total Amount", "Date"];

  return (
    isLoading ? <Loader /> :
      (<section id='salesSection'>
        <h2>Sales</h2>
        {error ? <p className="errorMessage">{error}</p> :
          <>
            <input type="search" placeholder='Enter invoice no. to search' className='searchProductInput' onChange={filterInputOnChange} />
            {data.length == 0 ? <p>No sale found <Link to='/admin/sales/addsale' style={{ textDecoration: "underline" }}>Create a sale</Link></p> :
              <Table columns={columns} data={filteredData ?? data} link="saledetails" dataTypes={dataTypesTable}/>}
          </>}
        <Link to="addsale"><button id="addSaleBtn">Add sale</button></Link>
      </section>)
  )
}

export default Sales
