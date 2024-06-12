import React, { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getSupplies } from '../features/supplies/supplySlice'
import "../styles/Supplies.css"
import Loader from '../components/Loader'
import Table from '../components/Table'


const Supplies = () => {

  const dispatch = useDispatch()

  const { data, error, isLoading } = useSelector((state) => state.supply)

  useMemo(() => {
    dispatch(getSupplies())
  }, [dispatch])

  const columns = useMemo(() => [
    {
      Header: "Description",
      accessor: "description"
    },
    {
      Header: "Date",
      accessor: "date"
    }
  ]);

  const dataTypesTable = ["Description", "Date"];

  return (
    isLoading ? <Loader /> :
      (<section id='suppliesSection'>
        <h2>Supplies</h2>
        {error ? <p className="errorMessage">{error}</p> :
          (data.length == 0 ? <p>No supply found <Link to='/admin/supplies/addsupply' style={{ textDecoration: "underline" }}>Create a supply</Link></p> : <Table columns={columns} data={data} link="supplydetails" dataTypes={dataTypesTable}/>)}
        <Link to="addsupply"><button id="addSupplyBtn">Add supply</button></Link>
      </section>)
  )
}

export default Supplies
