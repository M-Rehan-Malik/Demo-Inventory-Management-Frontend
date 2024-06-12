import React from 'react'
import { useTable } from 'react-table'
import "../styles/Table.css"
import { useNavigate } from 'react-router-dom'

const Table = (props) => {
    const { columns, data, link, dataTypes } = props

    const navigate = useNavigate();

    const handleRowClick = (row) => {
        if (link) {
            navigate(`${link}/${row.original._id}`, { state: row.original });
        }
    }

    const tableInstance = useTable({ columns, data })
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    return (
            <table {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map((headerGroup, index) => (
                            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                                {
                                    headerGroup.headers.map((column, index) => (
                                        <th {...column.getHeaderProps()} key={index}>
                                            {
                                                column.render('Header')}
                                        </th>
                                    ))}
                            </tr>
                        ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map((row, index) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()} key={index} onClick={() => { handleRowClick(row) }}>
                                    {
                                        row.cells.map((cell, index) => {
                                            return (
                                                <td {...cell.getCellProps()} key={index} datatype={dataTypes[index]}>
                                                    {cell.render('Cell')}
                                                </td>
                                            )
                                        })}
                                </tr>
                            )
                        })}
                </tbody>
            </table>
    )
}

export default Table
