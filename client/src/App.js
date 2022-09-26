import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard/Index";
import Bookmark from "./Pages/SiteBookmarks/Index";
import Card from "./Pages/Card/Index";
import { useLocalStorage } from "./Hooks/useLocalStorage";
import Site from "./Pages/Site.js";

import "./Pages/EditModel.scss";
import "./Pages/Buttons.scss";
import "./App.scss";

const App = () => {
  const [scrollAesthetic, setScrollAesthetic] = useState(false);
  const [cardData, setCardData] = useLocalStorage("cardData", false);
  const [bookmarkData, setBookmarkData] = useLocalStorage(
    "bookmarkData",
    false
  );

  window.getfetch = "https://nebula-finance-app.herokuapp.com/";
  //window.getfetch = "http://localhost:8081/";

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/" exact element={<Site />} />
          <Route
            path="/dashboard"
            exact
            element={
              <Dashboard
                setScrollAesthetic={setScrollAesthetic}
                scrollAesthetic={scrollAesthetic}
              />
            }
          >
            <Route
              path="card"
              element={
                <Card
                  setScrollAesthetic={setScrollAesthetic}
                  scrollAesthetic={scrollAesthetic}
                  cardData={cardData}
                  setCardData={setCardData}
                />
              }
            />
            <Route
              path="bookmark"
              exact
              element={
                <Bookmark
                  bookmarkData={bookmarkData}
                  setBookmarkData={setBookmarkData}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
