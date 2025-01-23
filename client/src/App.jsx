import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo_1 } from "./assets";
import { Home, CreatePost } from "./pages";
const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-[#0b0b0b] sm:px-8 px-4 py-4 border-b border-b-[#d2ddf1]">
        <Link to="/">
          <img
            src={logo_1}
            alt="logo"
            className="w-28 object-contain scale-150"
          />
        </Link>
        <Link
          to="/create-post"
          className="font inter font-medium bg-[#fcd1ab] text-black px-4 py-2 rounded-md"
        >
          Create New
        </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#eaa6c3] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
