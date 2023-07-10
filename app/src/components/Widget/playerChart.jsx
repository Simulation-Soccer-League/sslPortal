import React, { useState, useEffect } from "react";
import Plot from 'react-plotly.js';

const PlayerChart = () => {
    const [visData, setVisData] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_PUBLIC_API_URL}/playerGraph?player=Henrik%20Lind`);
                const data = await response.json();
                setVisData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const plotData = [
        {
            type: 'scatterpolar',
            r: visData.map((row) => row.Rating),
            theta: visData.map((row) => row.attributeIndex),
            mode: 'lines',
            text: visData.map((row) => row.text),
            fill: 'none',
            hoverinfo: 'text',
            line: {
                color: '#000000',
                width: 3
            }
        },
        {
            type: 'barpolar',
            theta: visData.map((row) => row.attributeIndex),
            width: 360,
            hoverinfo: 'none',
            r: [10],
            marker: {
                color: '#B81D13'
            }
        },
        {
            type: 'barpolar',
            width: 360,
            theta: visData.map((row) => row.attributeIndex),
            hoverinfo: 'none',
            r: [5],
            marker: {
                color: '#EFB700'
            }
        },
        {
            type: 'barpolar',
            width: 360,
            hoverinfo: 'none',
            theta: visData.map((row) => row.attributeIndex),
            r: [5],
            marker: {
                color: '#008450'
            }
        }
    ];

    const layout = {
        width: 400,
        height: 250,
        autosize: true,
        dragmode: false,
        margin: {
            l: 0, // Increase the left margin value
            r: 0, // Increase the right margin value
            t: 50, // Increase the top margin value
            b: 50, // Increase the bottom margin value
        },
        polar: {
            radialaxis: {
                visible: false,
                range: [0, 20]
            }
        },
        showlegend: false,
        paper_bgcolor: '#ffffff00',
        plot_bgcolor: '#ffffff00'
    };

    const config = {
        displayModeBar: false
    };

    return (
        <div>
            {visData.length > 0 ? (
                <Plot data={plotData} layout={layout} config={config} />
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
};

export default PlayerChart;

