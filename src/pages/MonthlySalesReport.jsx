import React, { useState } from 'react'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux';
import "../styles/MonthlySalesReport.css"
import { generateMonthlyReport } from '../features/sales/saleSlice';

const MonthlySalesReport = () => {

    let dispatch = useDispatch();

    let { isLoading, error } = useSelector(state => state.sale)


    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const defaultDate = {
        month: months[new Date(Date.now()).getMonth()],
        year: new Date(Date.now()).getFullYear().toString()
    }

    const [date, setDate] = useState({ ...defaultDate })

    const handleChange = (e) => {
        setDate({ ...date, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(generateMonthlyReport({ month: date.month, year: date.year }))
    }

    return (

        isLoading ? <Loader /> :
            (<section id='monthlyReportSection'>
                <h2>Monthly Report section</h2>
                <form onSubmit={handleSubmit}>
                    <h3>Select a month to get monthly report</h3>
                    <div className="dateSelectionContainer">
                        <div className="form-group">
                            <label htmlFor="month">Month</label>
                            <select name="month" id="month" onChange={handleChange} defaultValue={date.month}>
                                {months.map((month, index) => <option key={index} value={month}>{month}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="year">Year</label>
                            <select name="year" id="year" onChange={handleChange} defaultValue={date.year}>
                                {Array.from({ length: new Date(Date.now()).getFullYear() - 2024 + 1 }, (value, index) => 2024 + index).map((year, index) => {
                                    return <option key={index} value={year}>{year}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <button type="submit" id='getSalesReportBtn'>Get Sale Report</button>
                    {error && <p className='errorMessage'>{error}</p>}
                </form>
            </section>)
    )
}

export default MonthlySalesReport
