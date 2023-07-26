import React from 'react';
import ClubCell from '../ReactableStyles/ClubCell';
import SeasonCell from '../ReactableStyles/SeasonCell';
import { useQuery } from 'react-query';
import ReactableData from './ReactableData';
import { Link } from 'react-router-dom';

// Specifies any specific columns and their styles for the table
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
            position: 'sticky',
            left: 0,
            zIndex: 1,
            background: '#f8f8f8',
        },
        align: 'center',
        Cell: ({ value }) => (
            <Link to={`/player/${value}`}>{value}</Link>
        ),
    },
    {
        Header: 'S',
        accessor: 'Season',
        Cell: ({ value }) => (
            <SeasonCell value={value} />
        ),
    },
    {
        Header: 'Club',
        accessor: 'Club',
        maxWidth: 50,
        align: 'center',
        Cell: ({ value }) => (
            <ClubCell value={value} />
        ),
    },
    {
        Header: 'Apps',
        accessor: 'Apps',
    }
    // Add more specific settings for other columns if needed
]

// Defines what states the reactable should be in. See "DraftClassList.jsx" for how to implement sorting
const initialState = { pageIndex: 0, pageSize: 10, sortBy: [{ id: 'Average Rating', desc: true }] }

// Produces the table with all the settings
const StatisticsReactable = ({ url }) => {

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
}

export default StatisticsReactable;
