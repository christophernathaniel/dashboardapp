import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard/Index";
import Card from "./Pages/Card/Index";
import Bookmark from "./Pages/SiteBookmarks/Index";
import Bill from "./Pages/Bill/Index";

import "./Pages/EditModel.scss";
import "./Pages/Buttons.scss";

import { MdOutlineSpaceDashboard, MdOutlineMenu } from "react-icons/md";

import AvatarMaleCasual from "./Avatar/Image/avatar-male-casual.png";

import "bootstrap/dist/css/bootstrap.css";
import "./App.scss";
import "./Avatar/Avatar.scss";

const App = () => {
  window.getfetch = "https://nebula-finance-app.herokuapp.com/";
  //window.getfetch = "http://localhost:8081/";

  const ref = useRef();
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [MobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (profileDropdown && ref.current && !ref.current.contains(e.target)) {
        setProfileDropdown(false);
      }

      if (MobileSidebarOpen && ref.current && !ref.current.contains(e.target)) {
        setMobileSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [profileDropdown, MobileSidebarOpen]);

  return (
    <div class="wrapper">
      <BrowserRouter>
        <nav
          id="sidebar"
          className={
            "sidebar " + MobileSidebarOpen + " desktop-" + desktopSidebarOpen
          }
          ref={ref}
        >
          <div class="sidebar-content">
            <div class="sidebar-scroll">
              <ul class="sidebar-nav">
                <li class="sidebar-header">Finance</li>
                <div class="simplebar-wrapper">
                  <li class="sidebar-item">
                    <NavLink to="/dashboard">
                      <MdOutlineSpaceDashboard />
                      Dashboard
                      <span class="badge badge-sidebar-primary">5</span>
                    </NavLink>
                  </li>
                  <li class="sidebar-item">
                    <NavLink to="/card">Card</NavLink>
                  </li>
                </div>
                <li class="sidebar-header">Events</li>
                <li class="sidebar-header">Account</li>
                <li class="sidebar-header">Site Bookmarks</li>
                <div class="simplebar-wrapper">
                  <li class="sidebar-item">
                    <NavLink to="/bookmark">
                      <MdOutlineSpaceDashboard />
                      Bookmarks
                      <span class="badge badge-sidebar-primary">5</span>
                    </NavLink>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </nav>

        <div class="main">
          <nav class="navbar navbar-expand navbar-light navbar-bg">
            <div
              className="navbar-navicon"
              onClick={() => {
                setMobileSidebarOpen(!MobileSidebarOpen);
                setDesktopSidebarOpen(!desktopSidebarOpen);
              }}
            >
              <MdOutlineMenu size={24} />
            </div>
            <li class="nav-item dropdown" ref={ref}>
              <div
                className="dropdown-toggle navbar-profile"
                onClick={() => setProfileDropdown(!profileDropdown)}
              >
                <img
                  src={AvatarMaleCasual}
                  class="avatar img-fluid rounded-circle me-1"
                  alt="Chris Wood"
                  width={40}
                />
                <span class="nav-icon  d-inline-block d-sm-none"></span>

                <span class="nav-link d-none d-sm-inline-block">
                  <span class="text-dark">Christopher</span>
                </span>
              </div>
              {profileDropdown && (
                <div class="dropdown-menu dropdown-menu-end">
                  <div class="dropdown-item">Profile</div>

                  <div class="dropdown-divider"></div>
                  <div class="dropdown-item">Settings &amp; Privacy</div>
                  <div class="dropdown-item">Help</div>
                  <div class="dropdown-item">
                    <NavLink to="/login">Logout</NavLink>
                  </div>
                </div>
              )}
            </li>
          </nav>
          <Routes>
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/card" element={<Card />} />
            <Route path="/card/*" exact element={<Bill />} />
            <Route path="/bookmark" exact element={<Bookmark />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
