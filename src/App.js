import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./login";
import Dashboard from "./dashboard"; // This is the page you’ll navigate to

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/care-home" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>

  );
}

export default App;