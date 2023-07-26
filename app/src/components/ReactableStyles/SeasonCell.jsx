import React from 'react';

const SeasonCell = ({ value }) => {
    const renderSeason = (seasons) => {
        const firstValue = parseInt(seasons[0]);
        const lastValue = parseInt(seasons[seasons.length - 1]);

        const result = `${firstValue}-${lastValue}`;

        return <div >{result}</div>
    };

    if (value.includes(',')) {
        const seasons = value.split(',');
        return <div style={{ width: '50px' }}><React.Fragment>{renderSeason(seasons)}</React.Fragment></div>;
    } else {
        return (
            <div >{parseInt(value)}</div>
        );
    }
};

export default SeasonCell;
