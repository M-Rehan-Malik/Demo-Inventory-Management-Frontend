import React, { useEffect, useState } from 'react'
import "../styles/DailySalesReport.css"
import { useDispatch, useSelector } from 'react-redux';
import { generateSalesReport } from '../features/sales/saleSlice';
import Loader from '../components/Loader';

const DailySalesReport = () => {

    let dispatch = useDispatch();

    let { isLoading, error } = useSelector(state => state.sale)


    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const defaultDate = {
        month: months[new Date(Date.now()).getMonth()],
        day: new Date(Date.now()).getDate().toString(),
        year: new Date(Date.now()).getFullYear().toString()
    }

    const [date, setDate] = useState({ ...defaultDate })

    const days = new Date(Number(date.year), months.indexOf(date.month) + 1, 0).getDate();
    const [daysInMonth, setDaysInMonth] = useState(days)

    const updateDays = (month) => {
        const days = new Date(Number(date.year), months.indexOf(month) + 1, 0)
        setDaysInMonth(days.getDate())
    }

    const handleChange = (e) => {
        setDate({ ...date, [e.target.name]: e.target.value });
        if (e.target.name === 'month') updateDays(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedDate = new Date(Number(date.year), months.indexOf(date.month), Number(date.day)).toISOString();
        dispatch(generateSalesReport(formattedDate));
    }

    return (
        isLoading ? <Loader /> :
            (<section id='salesReportSection'>
                <h2>Sales Report section</h2>
                <form onSubmit={handleSubmit}>
                    <h3>Select a date to get sales report</h3>
                    <div className="dateSelectionContainer">
                        <div className="form-group">
                            <label htmlFor="month">Month</label>
                            <select name="month" id="month" onChange={handleChange} defaultValue={date.month}>
                                {months.map((month, index) => <option key={index} value={month}>{month}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="day">Day</label>
                            <select name="day" id="day" onChange={handleChange} defaultValue={date.day}>
                                {Array.from({ length: daysInMonth }, (value, index) => index + 1).map((day, index) => {
                                    return <option key={index} value={day}>{day}</option>
                                })}
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

export default DailySalesReport
