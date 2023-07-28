import React from "react";
// import StatisticWidget from "../components/Widget/Statistic.jsx";
import AchievementWidget from "../components/Widget/Achievment.jsx";
import PlayerChartWidget from "../components/Widget/playerChart.jsx";
import DashboardHeader from "../components/Other/DashboardHeader.jsx";
import GameDataReactable from "../components/Datatables/DataGame.jsx";
import { useOutletContext } from "react-router-dom";
import Tabs from "../components/Other/Tabs.jsx";
import AttributePage from "../components/Attributes/AttributePage.jsx";

function Dashboard(data) {
  const avatar =
    "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

  const [sidebarToggle] = useOutletContext();

  const tabs = [
    {
      label: 'Game Log', content: <GameDataReactable
        url={`${process.env.REACT_APP_PUBLIC_API_URL}/getPlayerStatistics?player=${data.playerName}`}
      />
    },
    {
      label: 'Player Build', content: <AttributePage
        url={`${process.env.REACT_APP_PUBLIC_API_URL}/getPlayer?player=${data.playerName}`}
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
          user={data.playerName}
        />

        {/* Player Information */}
        <div className="px-2 mx-auto mainCard">
          <div className="w-full overflow-hidden text-slate-700 md:grid grid md:grid-cols-6">
            {/* <StatisticWidget className="col-span-4 col-start-1 bg-white" /> */}
            <AchievementWidget
              url={`${process.env.REACT_APP_PUBLIC_API_URL}/getPlayer?player=${data.playerName}`}
            />
            <PlayerChartWidget
              url={`${process.env.REACT_APP_PUBLIC_API_URL}/playerGraph?player=${data.playerName}`}
            />
          </div>
        </div>

        <Tabs tabs={tabs} />
      </main>
    </>
  );
}

export default Dashboard;
