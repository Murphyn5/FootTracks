import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import { Link } from "react-router-dom";

function ActivityButton
  ({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "activity-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <li className={"nav-right-activity-container" + (showMenu ? " show-border" : "")}>
        {showMenu ?
        <i className="fa-solid fa-circle-plus activity-button" style={{fontSize:"30px"}} onClick={openMenu}></i>
        :
        <span className="fa-stack activity-button" onClick={openMenu}>
          <i className="fa-regular fa-circle fa-stack-2x"></i>
          <i className="fa-solid fa-plus" ></i>
        </span>}

        <ul className={ulClassName} ref={ulRef}>
          <div className="user-drop-down-menu">
            <Link to="/tracker" style={{ textDecoration: "none" }}>
              <div
                onClick={closeMenu}
                style={{ cursor: "pointer" }}
                className="user-drop-down-menu-button"
              >
                <i className="fa-solid fa-angles-up"></i>
                &nbsp;
                Record an Activity
              </div>
            </Link>
            <Link to="/activities/new" style={{ textDecoration: "none" }}>
              <div
                onClick={closeMenu}
                style={{ cursor: "pointer" }}
                className="user-drop-down-menu-button"
              >
                <i className="fa-solid fa-chart-line"></i>
                &nbsp;
                Manual Upload
              </div>
            </Link>
            <Link to="/activities/current" style={{ textDecoration: "none" }}>
              <div
                onClick={closeMenu}
                style={{ cursor: "pointer" }}
                className="user-drop-down-menu-button"
              >
                My Activities
              </div>
            </Link>
          </div>
        </ul>
      </li>
    </>
  );
}

export default ActivityButton
  ;
