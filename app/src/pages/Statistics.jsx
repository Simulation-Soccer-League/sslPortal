import React, { useState } from 'react';
import Navbar from "../components/Navbar/Index";
import { useOutletContext } from "react-router-dom";
import StatisticsReactable from '../components/Datatables/ReactableStatisticsTable';

function Statistics() {
    const [sidebarToggle] = useOutletContext();
    const [selectedSeason, setSelectedSeason] = useState('10');
    const [selectedDivision, setSelectedDivision] = useState('ALL');

    const handleSeasonChange = (event) => {
        setSelectedSeason(event.target.value);
    };

    const handleDivisionChange = (event) => {
        setSelectedDivision(event.target.value);
    };

    const seasonOptions = Array.from({ length: 10 }, (_, index) => `${index + 1}`);
    const divisionOptions = ['ALL', 0, 1, 2];

    return (
        <>
            <main className="h-full">
                <Navbar toggle={sidebarToggle} />

                {/* Main Content */}
                <div className="mainCard">
                    <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
                        <h1>League Statistics</h1>
                        <div className='dropdownInput'>
                            {/* Dropdown Input */}
                            <label htmlFor="season">Select a season</label>
                            <select id="season" value={selectedSeason} onChange={handleSeasonChange}>
                                {seasonOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            {/* Dropdown Input */}
                            <label htmlFor="division">Select a division</label>
                            <select id="division" value={selectedDivision} onChange={handleDivisionChange}>
                                {divisionOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <h3>Player Statistics</h3>
                        <StatisticsReactable
                            url={`${process.env.REACT_APP_PUBLIC_API_URL}/getCareerStatistics?playerType=player&season=${selectedSeason}&gameType=${selectedDivision}`}
                        />
                        <h3>Goalkeeper Statistics</h3>
                        <StatisticsReactable
                            url={`${process.env.REACT_APP_PUBLIC_API_URL}/getCareerStatistics?playerType=keeper&season=${selectedSeason}&gameType=${selectedDivision}`}
                        />
                    </div>
                </div>
            </main >
        </>
    );
}

export default Statistics;
