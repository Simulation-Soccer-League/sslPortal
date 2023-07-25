import React from 'react';
import { useQuery } from 'react-query';
import ClubCell from '../ReactableStyles/ClubCell';
import ReactableData from './ReactableStandingsData';

const namedColumns = [
    {
        Header: 'Team',
        accessor: 'Team',
        style: {
            minWidth: 100, // Minimum width of the Matchday column
            maxWidth: 100, // Fixed width of the Matchday column
            textAlign: 'center',
        },
        Cell: ({ value }) => (
            <ClubCell value={value} />
        )
    },
    {
        Header: 'Div.',
        accessor: 'Division',
        show: false,
    },

    // Add more specific settings for other columns if needed
]

function StandingsReactable({ url }) {
    const { data, isLoading, error } = useQuery(url, async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='reactable-container'>
            {data.map((tableData) => (
                <ReactableData data={tableData} namedColumns={namedColumns} />
            ))}
        </div>

    );
    // // Create a table instance with sorting and global filter functionality
    // const {
    //     getTableProps,
    //     getTableBodyProps,
    //     headerGroups,
    //     prepareRow,
    //     page,
    //     canNextPage,
    //     canPreviousPage,
    //     state: { pageIndex, pageSize },
    //     gotoPage,
    //     setGlobalFilter,
    //     state,
    // } = useTable(
    //     {
    //         columns, data, initialState: { pageIndex: 0, pageSize: 10, sortBy: [{ id: 'TPE', desc: true }] },
    //         defaultSortBy: [{ id: 'TPE', desc: true }]
    //     }, // Set the initial page index and page size
    //     useGlobalFilter,
    //     useSortBy,
    //     usePagination, // Add the usePagination hook
    // );
};

export default StandingsReactable;