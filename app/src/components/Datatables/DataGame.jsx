import React from 'react';
import { useQuery } from 'react-query';
import ReactableData from './ReactableData';

const namedColumns = [
    {
        Header: 'S',
        accessor: 'Season',
    },
    {
        Header: 'MD', // Updated column name to "MD"
        accessor: 'Matchday',
        style: {
            minWidth: 75, // Minimum width of the Matchday column
            maxWidth: 75, // Fixed width of the Matchday column
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            textAlign: 'center',
        },
    },
    {
        Header: 'Div.',
        accessor: 'Division',
    },
    {
        Header: 'Club',
        accessor: 'Club',
        maxWidth: 50,
        align: 'center',
        Cell: ({ value }) => (
            <div style={{ display: 'inline-block', width: '25px' }}>
                <img src={`../${value}.png`} style={{ height: '25px' }} alt={value} />
            </div>
        ),
    },
    {
        Header: 'Opp.',
        accessor: 'Opponent',
        name: 'Opp.',
        maxWidth: 50,
        align: 'center',
        Cell: ({ value }) => {
            if (value === null || value === undefined) {
                return <div className="club"> </div>;
            } else {
                return (
                    <div style={{ display: 'inline-block', width: '25px' }}>
                        <img src={`../${value}.png`} style={{ height: '25px' }} alt={value} />
                    </div>
                );
            }
        },
    },
    {
        Header: 'Result',
        accessor: 'Result',
        maxWidth: 60,
        Cell: ({ value }) => {
            let color;
            if (value === null || value === undefined) {
                color = '#FFFFFF';
            } else {
                const values = value.split('-');
                if (values.some((val) => ['a', 'p', 'e'].includes(val))) {
                    color = values[0].includes('a') || values[0].includes('p') || values[0].includes('e') ? '#A4D1A2' : '#CB8491';
                } else {
                    const numValues = values.map((val) => Number(val));
                    if (numValues[0] > numValues[1]) {
                        color = '#A4D1A2';
                    } else if (numValues[0] < numValues[1]) {
                        color = '#CB8491';
                    } else {
                        color = '#FFFFBF';
                    }
                }
            }

            return <div align="center" style={{ background: color }}>{value}</div>;
        },
    },
    // Add more specific settings for other columns if needed
]

// Defines what states the reactable should be in. See "DraftClassList.jsx" for how to implement sorting
const initialState = { pageIndex: 0, pageSize: 10 }

//
const GameDataReactable = ({ url }) => {
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

export default GameDataReactable;
