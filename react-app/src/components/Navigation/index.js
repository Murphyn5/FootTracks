import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useHistory } from 'react-router-dom';
import logo from "../../assets/LittleFoot.png";
import ActivityButton from './ActivityButton';
import TrainingButton from './TrainingButton';
import SearchBar from './SearchBar';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);
	const history = useHistory()
	return (
		<nav className="navbar">
			<ul className="navbar-content">
				<div className="nav-left-container">
					<li className="nav-left-logo">
						<NavLink exact to="/">
							<img className="logo-image" src={logo} alt="logo"></img>
						</NavLink>
					</li>
					{isLoaded && sessionUser ? (
						<>
						<SearchBar></SearchBar>
						&nbsp;&nbsp;
						<li className="nav-right-login">
							<TrainingButton className="profile-button" user={sessionUser} />
						</li>
						</>

					) : (
						<></>
					)}
				</div>
				{isLoaded && sessionUser ? (
					<div className="nav-right-container">
						<li className="nav-right-login">
							<ProfileButton className="profile-button" user={sessionUser} />
						</li>
						<li className="nav-right-login">
							<ActivityButton className="profile-button" user={sessionUser} />
						</li>
					</div>
				) : (
					<div className="login-signup-css">
						<button className="login-button" onClick={() => { history.push('/login') }}>Log In</button>

						<button className="signup-button" onClick={() => { history.push('/signup') }}>Sign Up</button>
					</div>
				)}
			</ul>
		</nav>
	);
}

export default Navigation;
