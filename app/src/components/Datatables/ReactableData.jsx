import ReactableComponent from './ReactableTable';
import useDataReactable from './ReactableDataSettings';
import React from 'react';

// Produces the actual table if data exists
const ReactableData = ({ data, namedColumns, initialState }) => {
    const tableProps = useDataReactable({ data, namedColumns, initialState });

    if (!data) return null; // Or render a placeholder, or loading state

    return (
        <ReactableComponent tableProps={tableProps} data={data} />
    )
};

export default ReactableData;