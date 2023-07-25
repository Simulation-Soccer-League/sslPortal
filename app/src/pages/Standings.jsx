import React, { useState } from 'react';
import Navbar from "../components/Navbar/Index";
import { useOutletContext } from "react-router-dom";
import StandingsReactable from "../components/Datatables/DataStandings";

function Standings() {
    const [sidebarToggle] = useOutletContext();
    const [selectedSeason, setSelectedSeason] = useState('10');

    const handleDropdownChange = (event) => {
        setSelectedSeason(event.target.value);
    };

    const seasonOptions = Array.from({ length: 10 }, (_, index) => `${index + 1}`);

    return (
        <>
            <main className="h-full">
                <Navbar toggle={sidebarToggle} />

                {/* Main Content */}
                <div className="mainCard">
                    <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
                        <h1>League Standings</h1>
                        <div className='dropdownInput'>
                            {/* Dropdown Input */}
                            <label htmlFor="dropdown">Select a season</label>
                            <select id="dropdown" value={selectedSeason} onChange={handleDropdownChange}>
                                {seasonOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <StandingsReactable
                            url={`${process.env.REACT_APP_PUBLIC_API_URL}/getStandingsData?season=${selectedSeason}`}
                        />
                    </div>
                </div>
            </main >
        </>
    );
}

export default Standings;
