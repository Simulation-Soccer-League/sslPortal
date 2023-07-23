import React from 'react';

const ClubCell = ({ value }) => {
    const renderClubs = (clubs) => {
        return clubs.map((club) => (
            <div key={club} style={{ display: 'inline-block', width: '25px' }}>
                <img src={`../${club}.png`} style={{ height: '25px' }} alt={club} />
            </div>
        ));
    };

    if (value.includes(',')) {
        const clubs = value.split(',');
        return <React.Fragment>{renderClubs(clubs)}</React.Fragment>;
    } else {
        return (
            <div style={{ display: 'inline-block', width: '25px' }}>
                <img src={`../${value}.png`} style={{ height: '25px' }} alt={value} />
            </div>
        );
    }
};

export default ClubCell;
