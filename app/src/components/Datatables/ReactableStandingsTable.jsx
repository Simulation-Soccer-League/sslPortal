import React from 'react';
// import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table';

const ReactableComponent = ({ tableProps }) => {
    const { getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        rows,
        state, } = tableProps;



    const TableComponent = () => {
        return (
            <div className="table-container"> {/* Add the container with horizontal scroll */}
                <table {...getTableProps()} className="reactable" style={{ borderCollapse: 'collapse' }}>
                    {/* Table headers */}
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()} className="reactable-header">
                                {headerGroup.headers.map((column) => (
                                    <th
                                        {...column.getHeaderProps()}
                                        className="reactable-header"
                                        style={{
                                            // Removes Division and Position from the shown table
                                            display: column.id === 'Division' || column.id === 'Pos' ? 'none' : 'table-cell',
                                            padding: '8px', borderBottom: '1px solid #ccc'
                                        }}
                                    >
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    {/* Table body */}
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row);

                            const division = row.original.Division; // Access 'Division' from the row data
                            const position = row.original.Pos; // Access 'Pos' from the row data
                            return (
                                <tr {...row.getRowProps()} className="reactable-row">
                                    {row.cells.map((cell) => (
                                        <td
                                            {...cell.getCellProps()}
                                            className="reactable-cell"
                                            style={{
                                                display: cell.column.id === 'Division' || cell.column.id === 'Pos' ? 'none' : 'table-cell',
                                                minWidth: 50,
                                                maxWidth: 100,
                                                textAlign: "center",
                                                background:
                                                    division === '1' && position > 6 ? "#6D071A" :
                                                        division === '2' && position < 3 ? "#01731A" : 'transparent',
                                                color:
                                                    division === '1' && position > 6 ? "white" :
                                                        division === '2' && position < 3 ? "white" : 'black',
                                            }}
                                            title={cell.value} // Show the full content on hover
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    };



    return (
        <div className='reactable-container'>
            <div className='reactable-table-container'>
                <TableComponent />
            </div>
        </div>
    );
}

export default ReactableComponent;