import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import ClubCell from '../ReactableStyles/ClubCell';
import ReactableData from './ReactableData';

const namedColumns = [
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
            minWidth: 40, // Minimum width of the Matchday column
            maxWidth: 40, // Fixed width of the Matchday column
            textAlign: 'center',
        },
        Cell: ({ value }) => (
            <ClubCell value={value} />
        )
    },
    {
        Header: 'Position',
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
]

const initialState = { pageIndex: 0, pageSize: 15, sortBy: [{ id: 'TPE', desc: true }] };

function DraftClassList({ url }) {
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
        <ReactableData data={data} namedColumns={namedColumns} initialState={initialState} />
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

export default DraftClassList;