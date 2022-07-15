import React from "react";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
// import Profile from "./Components/Profile";
const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Hero />
            </>
          }
        />
        <Route path="/channels" element={<Home />} />
        <Route path="/channels:id" element={<Home />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </div>
  );
};

export default App;
