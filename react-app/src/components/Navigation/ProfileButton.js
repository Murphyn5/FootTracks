import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import { Link } from "react-router-dom";

function ProfileButton({ user }) {
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

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <li className={"nav-right-profile-container" + (showMenu ? " show-border" : "")}>
        <button onClick={openMenu} className="profile-button" style={{ width: "80%" }}>
          <i className="fas fa-user-circle" style={{ fontSize: "30px" }} />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <i class="fa-solid fa-angle-down" style={{ fontSize: "20px" }}></i>
        </button>
        <ul className={ulClassName} ref={ulRef}>
          {user ? (
            <div className="user-drop-down-menu">
              <div
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
                className="user-drop-down-menu-button"
              >
                  Log Out
              </div>
            </div>
          ) : (
            <>
              <Link to="/login">
                <button onClick={closeMenu} >Log In</button>
              </Link>

              <Link to="/signup">
                <button onClick={closeMenu}>Sign Up</button>
              </Link>
            </>
          )}
        </ul>
      </li>
    </>
  );
}

export default ProfileButton;
