// src/components/DataTable.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PlayerList = () => {
    const url = `${process.env.REACT_APP_PUBLIC_API_URL}/listPlayers`;

    const [data, setData] = useState(null);

    useEffect(() => {
        // Fetch data from the API
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const jsonData = await response.json();
                setData(JSON.parse(jsonData));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [url]);

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {data ? Object.entries(data).map(([key, value]) => (
                    <tr key={key}>
                        <td>{key}</td>
                        <td>
                            <Link to={`/player/${value[0]}`}>{value[0]}</Link>
                        </td>
                    </tr>
                )) : "Loading..."}
            </tbody>
        </table>
    );
};

export default PlayerList;