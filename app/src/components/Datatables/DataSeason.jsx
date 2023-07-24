import React from 'react';
import ClubCell from '../ReactableStyles/ClubCell';
import { useQuery } from 'react-query';
import ReactableData from './ReactableData';

// Specifies any specific columns and their styles for the table
const namedColumns = [
    {
        Header: 'S',
        accessor: 'Season',
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
    // Add more specific settings for other columns if needed
]

// Defines what states the reactable should be in. See "DraftClassList.jsx" for how to implement sorting
const initialState = { pageIndex: 0, pageSize: 10 }

// Produces the table with all the settings
const SeasonDataReactable = ({ url }) => {
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

export default SeasonDataReactable;
