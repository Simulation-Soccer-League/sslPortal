import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import "./components/Datatables/reactableStyles.css";
import AuthLayout from "./components/Layout/AuthLayout";
import GuestLayout from "./components/Layout/GuestLayout";
import "./components/Other/Tabs.css";
import "./components/Widget/widget.css";
import Standings from "./pages/Standings";
import Dashboard from "./pages/Dashboard";
import Form from "./pages/Form";
import Statistics from "./pages/Statistics";
import PlayerPage from "./pages/PlayerPage.jsx";
import Table from "./pages/Table";
import Login from "./pages/auth/Login";
import RegisterIndex from "./pages/auth/Register";

function App() {
  const [token, setToken] = useState();
  // if (!token) {
  //   return <Login setToken={setToken} />
  // }

  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<Dashboard playerName="Henrik Lind" />}></Route>
        <Route path="/draftClass" element={<Table />}></Route>
        <Route path="/standings" element={<Standings />}></Route>
        <Route path="/statistics" element={<Statistics />}></Route>
        <Route path="/form" element={<Form />}></Route>
        {/* <Route path="/profile" element={<Profile />}></Route> */}
        <Route path="/player/:playerName" element={<PlayerPage />} />
      </Route>
      {/* <Route path="/auth" element={<GuestLayout />}>
        <Route path="/auth/login" element={<Login setToken={setToken} />}></Route>
        <Route path="/auth/register" element={<RegisterIndex />}></Route>
      </Route> */}

    </Routes>
  );
}

export default App;
