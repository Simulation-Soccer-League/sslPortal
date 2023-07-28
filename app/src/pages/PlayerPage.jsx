import React from "react";
// import StatisticWidget from "../components/Widget/Statistic.jsx";
import AchievementWidget from "../components/Widget/Achievment.jsx";
import PlayerChartWidget from "../components/Widget/playerChart.jsx";
import DashboardHeader from "../components/Other/DashboardHeader.jsx";
import GameDataReactable from "../components/Datatables/DataGame.jsx";
import SeasonDataReactable from "../components/Datatables/DataSeason.jsx";
import Tabs from "../components/Other/Tabs.jsx";
import { useParams, useOutletContext } from 'react-router-dom';
import AttributePage from "../components/Attributes/AttributePage.jsx";

function PlayerPage() {
  const { playerName } = useParams();

  const avatar =
    "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

  const [sidebarToggle] = useOutletContext();

  const tabs = [
    {
      label: 'Game Log', content: <GameDataReactable
        url={`${process.env.REACT_APP_PUBLIC_API_URL}/getPlayerStatistics?player=${playerName}`}
      />
    },
    {
      label: 'Season Data', content: <SeasonDataReactable
        url={`${process.env.REACT_APP_PUBLIC_API_URL}/getPlayerStatistics?player=${playerName}&seasonTotal=TRUE`}
      />
    },
    {
      label: 'Player Build', content: <AttributePage
        url={`${process.env.REACT_APP_PUBLIC_API_URL}/getPlayer?player=${playerName}`}
      />
    },
    // { label: 'Tab 3', content: 'This is the content of Tab 3.' },
  ];


  return (
    <>
      <main className="h-full">
        {/* Welcome Header */}
        <DashboardHeader
          toggle={sidebarToggle}
          avatar={avatar}
          user={playerName}
        />

        {/* Player Information */}
        <div className="px-2 mx-auto mainCard">
          <div className="w-full overflow-hidden text-slate-700 md:grid grid md:grid-cols-6">
            {/* <StatisticWidget className="col-span-4 col-start-1 bg-white" /> */}
            <AchievementWidget
              url={`${process.env.REACT_APP_PUBLIC_API_URL}/getPlayer?player=${playerName}`}
            />
            <PlayerChartWidget
              url={`${process.env.REACT_APP_PUBLIC_API_URL}/playerGraph?player=${playerName}`}
            />
          </div>
        </div>

        <Tabs tabs={tabs} />
      </main>
    </>
  );
}

export default PlayerPage;
