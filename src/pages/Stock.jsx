import React, { useMemo, useState } from 'react'
import Table from '../components/Table'
import { Link, useNavigate } from 'react-router-dom'
import "../styles/Stock.css"
import { useDispatch, useSelector } from 'react-redux'
import { generateStockReport, getStock } from '../features/stock/stockSlice'
import Loader from '../components/Loader'


const Stock = () => {

  const dispatch = useDispatch();

  const { data, isLoading, error } = useSelector((state) => state.stock);

  const [filteredData, setFilteredData] = useState(null)

  const navigate = useNavigate();

  useMemo(() => {
    dispatch(getStock());
  }, [dispatch])

  const filterInputOnChange = (e) => {
    const { value } = e.target;
    const filteredData = data.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredData(filteredData);
  }

  const columns = useMemo(() => [
    {
      Header: "Name",
      accessor: "name"
    },
    {
      Header: "Quantity (Ctn)",
      accessor: "quantityCtn"
    },
    {
      Header: "Quantity (Pcs)",
      accessor: "quantityPcs"
    }
  ]);

  const getStockReport = async () => {
    const productsArr = filteredData ?? data;
    await dispatch(generateStockReport(productsArr))
    navigate("/admin")
  }


  const dataTypesTable = ["Name", "Quantity (Ctn)", "Quantity (Pcs)"];

  return (
    isLoading ? <Loader /> :
      (<section id='stockSection'>
        <h2>Stock</h2>
        {error ? <p className="errorMessage">{error}</p> :
          <>
            <input type="search" placeholder='Enter product name to search' className='searchProductInput' onChange={filterInputOnChange} />
            {data.length === 0 ? <p>No stock found <Link to='/admin/products/addproduct' style={{ textDecoration: "underline" }}>Create a product</Link></p> : <Table columns={columns} data={filteredData ?? data} dataTypes={dataTypesTable}/>}
            <button id="getStockReportBtn" onClick={getStockReport} disabled={filteredData && filteredData.length === 0}>
              Get Stock Report
            </button>
          </>}
      </section>)
  )
}

export default Stock
