import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import "./components/Datatables/reactableStyles.css";
import AuthLayout from "./components/Layout/AuthLayout";
import GuestLayout from "./components/Layout/GuestLayout";
import "./components/Other/Tabs.css";
import "./components/Widget/widget.css";
import Blank from "./pages/Blank";
import Dashboard from "./pages/Dashboard";
import Form from "./pages/Form";
import NotFound from "./pages/NotFound";
import PlayerPage from "./pages/PlayerPage.jsx";
import Table from "./pages/Table";
import Login from "./pages/auth/Login";
import RegisterIndex from "./pages/auth/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<Dashboard playerName="Henrik Lind" />}></Route>
        <Route path="/draftClass" element={<Table />}></Route>
        <Route path="/blank" element={<Blank />}></Route>
        <Route path="/404" element={<NotFound />}></Route>
        <Route path="/form" element={<Form />}></Route>
        <Route path="/profile" element={<Blank />}></Route>
        <Route path="/player/:playerName" element={<PlayerPage />} />
      </Route>
      <Route path="/auth" element={<GuestLayout />}>
        <Route path="/auth/login" element={<Login />}></Route>
        <Route path="/auth/register" element={<RegisterIndex />}></Route>
      </Route>

    </Routes>
  );
}

export default App;
