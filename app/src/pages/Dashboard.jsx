import React from "react";
// import StatisticWidget from "../components/Widget/Statistic.jsx";
import AchievementWidget from "../components/Widget/Achievment.jsx";
import PlayerChartWidget from "../components/Widget/playerChart.jsx";
import DashboardHeader from "../components/Other/DashboardHeader.jsx";
import GameDataReactable from "../components/Datatables/gameData.jsx";
import { useOutletContext } from "react-router-dom";

function Dashboard() {
  const avatar =
    "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

  const [sidebarToggle] = useOutletContext();

  return (
    <>
      <main className="h-full">
        {/* Welcome Header */}
        <DashboardHeader
          toggle={sidebarToggle}
          avatar={avatar}
          user={{ name: "Hoki Teguh Oktian" }}
        />

        {/* Player Information */}
        <div className="px-2 mx-auto mainCard">
          <div className="w-full overflow-hidden text-slate-700 md:grid grid md:grid-cols-6">
            {/* <StatisticWidget className="col-span-4 col-start-1 bg-white" /> */}
            <AchievementWidget />
            <PlayerChartWidget />
          </div>
        </div>

        {/* OS Kredit */}
        <div className="px-2 mx-auto mainCard">
          <h1 className="text-slate-500 pb-3 text-base md:text-lg">
            Game Log
          </h1>

          <div className="flex flex-row gap-x-4 overflow-hidden overflow-x-auto justify-between">
            <GameDataReactable />
          </div>

          <div className="lg:w-full w-[1024px] overflow-hidden flex flex-row justify-between text-slate-700 gap-2 lg:max-h-screen overflow-x-auto whitespace-nowrap"></div>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
