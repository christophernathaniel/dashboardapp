import React, { useState, useRef, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";

import "../EditModel.scss";
import "../Buttons.scss";

import Logo from "./Logo.svg";

import { BsFillCreditCard2BackFill, BsBookmarksFill } from "react-icons/bs";

import { MdOutlineSpaceDashboard, MdOutlineMenu } from "react-icons/md";

import AvatarMaleCasual from "../../Avatar/Image/avatar-male-casual.png";

import "bootstrap/dist/css/bootstrap.css";
import "./Dashboard.scss";
import "../../Avatar/Avatar.scss";

const Dashboard = (props) => {
  const ref = useRef();
  const navigate = useNavigate();
  const [user, setUser] = useState(0);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [MobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      setUser(user.uuid);

      if (!user) {
        localStorage.removeItem("token");
        localStorage.removeItem("cardData");
        localStorage.removeItem("bookmarkData");

        navigate("/login");
      } else {
      }
    } else {
      navigate("/login");
    }
  }, []);

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

  useEffect(() => {
    props.setScrollAesthetic(false);
  }, [NavLink]);

  return (
    <div className="wrapper">
      <nav
        id="sidebar"
        className={
          "sidebar " + MobileSidebarOpen + " desktop-" + desktopSidebarOpen
        }
        ref={ref}
      >
        <div className="sidebar-content">
          <div className="sidebar-scroll">
            <ul className="sidebar-nav">
              <li className="sidebar-header">Finance</li>
              <div className="simplebar-wrapper">
                <li className="sidebar-item">
                  <NavLink to="/dashboard">
                    <MdOutlineSpaceDashboard />
                    Dashboard
                    <span className="badge badge-sidebar-primary">5</span>
                  </NavLink>
                </li>
                <li className="sidebar-item">
                  <NavLink to="/dashboard/card">Card</NavLink>
                </li>
              </div>
              <li className="sidebar-header">Events</li>
              <li className="sidebar-header">Account</li>
              <li className="sidebar-header">Site Bookmarks</li>
              <div className="simplebar-wrapper">
                <li className="sidebar-item">
                  <NavLink to="/dashboard/bookmark">
                    <MdOutlineSpaceDashboard />
                    Bookmarks
                    <span className="badge badge-sidebar-primary">5</span>
                  </NavLink>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>

      <nav className="mobile-sidenav">
        <li className="sidenav-item">
          <NavLink
            to="/dashboard"
            onClick={() => props.setScrollAesthetic(false)}
          >
            <MdOutlineSpaceDashboard />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li
          className="sidenav-item"
          onClick={() => props.setScrollAesthetic(false)}
        >
          <NavLink to="/dashboard/card">
            <BsFillCreditCard2BackFill />
            <span>Finance</span>
          </NavLink>
        </li>
        <li
          className="sidenav-item"
          onClick={() => props.setScrollAesthetic(false)}
        >
          <NavLink to="/dashboard/bookmark">
            <BsBookmarksFill />
            <span>Bookmarks</span>
          </NavLink>
        </li>
      </nav>

      <div className="main">
        <nav
          className={`navbar navbar-expand navbar-light navbar-bg scrollAesthetic-${props.scrollAesthetic}`}
        >
          <div
            className="navbar-navicon"
            onClick={() => {
              setMobileSidebarOpen(!MobileSidebarOpen);
              setDesktopSidebarOpen(!desktopSidebarOpen);
            }}
          >
            <MdOutlineMenu size={24} />
          </div>
          <li className="nav-item dropdown" ref={ref}>
            <img className="logo" src={Logo} alt="Creative Nebula Logo" />
          </li>
          <li className="nav-item dropdown" ref={ref}>
            <div
              className="dropdown-toggle navbar-profile"
              onClick={() => setProfileDropdown(!profileDropdown)}
            >
              <img
                src={AvatarMaleCasual}
                className="avatar img-fluid rounded-circle me-1"
                alt="Chris Wood"
                width={40}
              />
              <span className="nav-icon  d-inline-block d-sm-none"></span>

              <span className="nav-link d-none d-sm-inline-block">
                <span className="text-dark">Christopher</span>
              </span>
            </div>
            {profileDropdown && (
              <div className="dropdown-menu dropdown-menu-end">
                <div className="dropdown-item">Profile</div>

                <div className="dropdown-divider"></div>
                <div className="dropdown-item">Settings &amp; Privacy</div>
                <div className="dropdown-item">Help</div>
                <div className="dropdown-item">
                  <NavLink to="/login">Logout</NavLink>
                </div>
              </div>
            )}
          </li>
        </nav>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
