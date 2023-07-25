import ReactableComponent from './ReactableStandingsTable';
import useDataReactable from './ReactableStandingsDataSettings';
import React from 'react';

// Produces the actual table if data exists
const ReactableData = ({ data, namedColumns }) => {
    const tableProps = useDataReactable({ data, namedColumns });

    if (!data) return null; // Or render a placeholder, or loading state

    // console.log(data)

    return (
        <ReactableComponent tableProps={tableProps} />
    )
};

export default ReactableData;