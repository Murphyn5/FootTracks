import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
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
      <button onClick={openMenu} className="profile-button">
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="user-drop-down-menu">
            <li className="user-drop-down-name">
              {user.first_name} {`${user.last_name[0]}.`}
            </li>
            <button className="button-logout" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        ) : (
          <>
            <Link to="/login">
              <button onClick={closeMenu}>Log In</button>
            </Link>

            <Link to="/signup">
              <button onClick={closeMenu}>Sign Up</button>
            </Link>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
