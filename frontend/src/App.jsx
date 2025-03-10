import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Preference from "./pages/Preference";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import AllDestinations from "./pages/admin/AllDestinations";
import AllUsers from "./pages/admin/AllUsers";
import Otp from "./pages/otp";
import Translator from "./pages/Translator";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/prefernce" element={<Preference />} />
        <Route path="/map" element={<Map />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/allTrips" element={<AllDestinations />} />
        <Route path="/allUsers" element={<AllUsers />} />
        <Route path="/translator" element={<Translator />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
