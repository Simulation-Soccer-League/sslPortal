import React, { useEffect, useMemo, useState } from 'react';
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table';
import { Link } from 'react-router-dom';

function DraftClassList({ url }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [url]);


    // Specific settings for certain columns
    const specificColumns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'Name',
                style: {
                    minWidth: 175, // Minimum width of the Matchday column
                    maxWidth: 175, // Fixed width of the Matchday column
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    textAlign: 'left',
                },
                align: 'center',
                Cell: ({ value }) => (
                    <Link to={`/player/${value}`}>{value}</Link>
                ),
            },
            {
                Header: 'Username',
                accessor: 'Username',
                style: {
                    minWidth: 150, // Minimum width of the Matchday column
                    maxWidth: 150, // Fixed width of the Matchday column
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    textAlign: 'left',
                },
            },
            {
                Header: 'Class',
                accessor: 'Class'
            },
            {
                Header: 'Team',
                accessor: 'Team',
                style: {
                    minWidth: 150, // Minimum width of the Matchday column
                    maxWidth: 150, // Fixed width of the Matchday column
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    textAlign: 'left',
                },
            },
            {
                Header: 'Preferred Position',
                accessor: 'Preferred Position',
                style: {
                    minWidth: 50, // Minimum width of the Matchday column
                    maxWidth: 50, // Fixed width of the Matchday column
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    textAlign: 'left',
                },
            },

            // Add more specific settings for other columns if needed
        ],
        []
    );

    // Dynamically generate columns based on data keys and filter out duplicates and specific columns
    const dynamicColumns = useMemo(() => {
        if (data.length === 0) return [];

        const excludedColumns = ['Name'];

        const dynamicKeys = Object.keys(data[0]).filter(
            (key) => !specificColumns.some((col) => col.accessor === key) && !excludedColumns.includes(key)
        );

        return dynamicKeys.map((key) => ({ Header: key, accessor: key }));
    }, [data, specificColumns]);


    // Combine dynamic and specific columns into a single memo
    const columns = useMemo(() => {
        return [...specificColumns, ...dynamicColumns];
    }, [specificColumns, dynamicColumns]);


    // Create a table instance with sorting and global filter functionality
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canNextPage,
        canPreviousPage,
        state: { pageIndex, pageSize },
        gotoPage,
        setGlobalFilter,
        state,
    } = useTable(
        {
            columns, data, initialState: { pageIndex: 0, pageSize: 10, sortBy: [{ id: 'TPE', desc: true }] },
            defaultSortBy: [{ id: 'TPE', desc: true }]
        }, // Set the initial page index and page size
        useGlobalFilter,
        useSortBy,
        usePagination, // Add the usePagination hook
    );


    // Apply a row style for every row where Season is odd
    const rowStyle = (row) => {
        return {
            background: row.original.Season % 2 === 1 ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0)',
        };
    };

    // Calculate the total number of pages
    const totalRowCount = data.length;
    const calculatedPageCount = Math.ceil(totalRowCount / pageSize);

    const { globalFilter } = state;

    const lastPageIndex = calculatedPageCount - 1;

    const gotoPageWithCheck = (pageIndex) => {
        const safePageIndex = Math.min(Math.max(pageIndex, 0), lastPageIndex);
        gotoPage(safePageIndex);
    };


    // Custom pagination component with numbers and ellipses
    const PaginationComponent = () => {
        const showPageNumbers = 5; // Number of page numbers to display (excluding ellipses)

        const getPageNumbers = () => {
            const pages = [];

            const includeFirstPage = pageIndex > 0;
            const includeLastPage = pageIndex < lastPageIndex;

            if (includeFirstPage && !pages.includes(0)) pages.push(0);

            if (calculatedPageCount <= showPageNumbers) {
                for (let i = 0; i < calculatedPageCount; i++) {
                    if (!pages.includes(i)) pages.push(i);
                }
            } else {
                const leftBound = Math.max(0, pageIndex - Math.floor(showPageNumbers / 2));
                const rightBound = Math.min(calculatedPageCount - 1, pageIndex + Math.floor(showPageNumbers / 2));

                if (leftBound > 0) pages.push('...');
                for (let i = leftBound; i <= rightBound; i++) {
                    if (!pages.includes(i)) pages.push(i);
                }
                if (rightBound < calculatedPageCount - 1 && !pages.includes(calculatedPageCount - 1)) pages.push('...');
            }

            if (includeLastPage && !pages.includes(lastPageIndex)) pages.push(lastPageIndex);

            return pages;
        };

        return (
            <div className="reactable-pagination-nav">
                <button
                    type="button"
                    className="reactable-prev-button reactable-page-button"
                    disabled={!canPreviousPage}
                    aria-disabled={!canPreviousPage}
                    aria-label="Previous page"
                    onClick={() => gotoPageWithCheck(pageIndex - 1)}
                >
                    Previous
                </button>
                {getPageNumbers().map((pageNumber, index) => (
                    <React.Fragment key={index}>
                        {typeof pageNumber === 'number' ? (
                            <button
                                type="button"
                                className={`reactable-page-button ${pageIndex === pageNumber ? 'reactable-page-button-current' : ''} ${pageNumber === 0 ? 'reactable-page-button-first' : ''
                                    } ${pageNumber === lastPageIndex ? 'reactable-page-button-last' : ''}`}
                                aria-label={`Page ${pageNumber + 1}`}
                                aria-current={pageIndex === pageNumber ? 'page' : undefined}
                                onClick={() => gotoPageWithCheck(pageNumber)}
                            >
                                {pageNumber + 1}
                            </button>
                        ) : (
                            <span key={index} className="reactable-page-ellipsis" role="separator">
                                ...
                            </span>
                        )}
                    </React.Fragment>
                ))}
                <button
                    type="button"
                    className="reactable-next-button reactable-page-button"
                    disabled={!canNextPage}
                    aria-disabled={!canNextPage}
                    aria-label="Next page"
                    onClick={() => gotoPageWithCheck(pageIndex + 1)}
                >
                    Next
                </button>
            </div>
        );
    };


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
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                        className="reactable-header"
                                        style={{ padding: '8px', borderBottom: '1px solid #ccc', cursor: 'pointer' }}
                                    >
                                        {column.render('Header')}
                                        {/* Add sorting icons */}
                                        <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    {/* Table body */}
                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} className="reactable-row" style={rowStyle(row)}>
                                    {row.cells.map((cell) => (
                                        <td
                                            {...cell.getCellProps()}
                                            className="reactable-cell"
                                            style={{
                                                padding: '8px',
                                                borderBottom: '1px solid #ccc',
                                                ...cell.column.style,
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
        )
    };

    return (
        <div className='reactable-container'>
            <div className='reactable-settings-container'>
                <div className="reactable-settings">
                    {/* ... Your search input and pagination code ... */}
                    <input
                        type="search"
                        value={globalFilter || ''}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="reactable-input" // Apply "reactable-input" class
                        placeholder="Search..."
                    />
                    {/* Custom Pagination */}
                    <PaginationComponent
                        pageCount={calculatedPageCount}
                        pageIndex={state.pageIndex}
                        gotoPage={gotoPage}
                        canPreviousPage={canPreviousPage}
                        canNextPage={canNextPage}
                    />
                </div>
            </div>
            <div className='reactable-table-container'>
                <TableComponent />
            </div>
            <div className='reactable-settings-container'>
                <div className='reactable-settings'>
                    {/* Custom Pagination */}
                    <PaginationComponent
                        pageCount={calculatedPageCount}
                        pageIndex={state.pageIndex}
                        gotoPage={gotoPage}
                        canPreviousPage={canPreviousPage}
                        canNextPage={canNextPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default DraftClassList;