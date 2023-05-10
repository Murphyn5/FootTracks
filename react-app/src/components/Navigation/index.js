import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useHistory } from 'react-router-dom';
import logo from "../../assets/LittleFoot.png";
import ActivityButton from './ActivityButton';
import TrainingButton from './TrainingButton';
import SearchBar from './SearchBar';
import MobileSearchBar from "./MobileSearchBar"
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useModal } from '../../context/Modal';

import { Fragment } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
	ArrowPathIcon,
	Bars3Icon,
	ChartPieIcon,
	CursorArrowRaysIcon,
	FingerPrintIcon,
	SquaresPlusIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';



const whatWeDoLinks = [
	{ name: ' Record an Activity', description: 'Get a better understanding of your traffic', href: '/tracker', icon: () => <><i className="fa-solid fa-angles-up"></i></> },
	{ name: ' Manual Upload', description: 'Speak directly to your customers', href: '/activities/new', icon: () => <><i className="fa-solid fa-chart-line"></i></> },
	{ name: 'My Activities', description: 'Your customers’ data will be safe and secure', href: '/activities/current', icon: () => <></> },
]

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

function Navigation({ isLoaded }) {
	const dispatch = useDispatch();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const sessionUser = useSelector((state) => state.session.user);
	const history = useHistory()
	const { closeModal } = useModal();
	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
		setMobileMenuOpen(false)
	};
	return (
		// <nav className="navbar">
		// 	<ul className="navbar-content">
		// 		<div className="nav-left-container">
		// <li className="nav-left-logo">
		// <NavLink exact to="/">
		// 	<img className="logo-image" src={logo} alt="logo"></img>
		// </NavLink>
		// </li>
		// 			&nbsp;&nbsp;
		// {isLoaded && sessionUser ? (
		// 	<>
		// 		<SearchBar></SearchBar>
		// 	</>

		// ) : (
		// 	<></>
		// )}
		// 		</div>
		// {isLoaded && sessionUser ? (
		// 	<div className="nav-right-container">

		// 		<ProfileButton className="profile-button" user={sessionUser} />



		// 		<ActivityButton className="activity-button" user={sessionUser} />

		// 	</div>
		// ) : (
		// 	<div className="login-signup-css">
		// 		<button className="login-button" onClick={() => { history.push('/login') }}>Log In</button>

		// 		<button className="signup-button" onClick={() => { history.push('/signup') }}>Sign Up</button>
		// 	</div>
		// )}
		// 	</ul>
		// </nav>

		<header className="bg-white navbar">
			<nav className="navbar-content px-8" aria-label="Global">
				<div className="flex nav-left-container">
					<NavLink exact to={"/"} onClick={() => {closeModal()}}>
						<img className="logo-image h-10" src={logo} alt="logo"></img>
					</NavLink>
					&nbsp;&nbsp;
					{isLoaded && sessionUser ? (
						<>
							<SearchBar></SearchBar>
						</>

					) : (
						<></>
					)}

				</div>
				<div className="flex lg:hidden">
					<button
						type="button"
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-black"
						onClick={() => setMobileMenuOpen(true)}
					>
						<span className="sr-only">Open main menu</span>
						<Bars3Icon className="h-6 w-6" aria-hidden="true" />
					</button>
				</div>

				<div className="hidden lg:flex lg:flex-1 lg:justify-end">
					{isLoaded && sessionUser ? (
						<div className="nav-right-container">

							<ProfileButton className="profile-button" user={sessionUser} />



							<ActivityButton className="activity-button" user={sessionUser} />

						</div>
					) : (
						<div className="login-signup-css">
							<button className="login-button" onClick={() => { history.push('/login') }}>Log In</button>

							<button className="signup-button" onClick={() => { history.push('/signup') }}>Sign Up</button>
						</div>
					)}
				</div>
			</nav>
			{/* <div id="comp-l7jfgkd7" className="mx-auto text-black font-assistant max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global" data-testid="richTextElement">
		  <p className="font_0 wixui-rich-text__text"  style={{fontSize:"16px", lineHeight:"1.41em"}}>
			<span style={{fontSize:"16px"}} className="wixui-rich-text__text">
			  <span className="wixui-rich-text__text">
				<span className="color_11 wixui-rich-text__text">
				  <span style={{letterSpacing:"normal"}} className="wixui-rich-text__text">CENTER &nbsp;FOR LEARNING ALLIANCE:</span>
				</span>
			  </span>
			</span>
		  </p>

		  <p className="font_0 wixui-rich-text__text" style={{fontSize:"16px", lineHeight:"1.41em"}}>
			<span style={{fontSize:"16px"}} className="wixui-rich-text__text">
			  <span className="wixui-rich-text__text">
				<span className="color_11 wixui-rich-text__text">
				  <span style={{letterSpacing:"normal"}} className="wixui-rich-text__text">Fundación Cotococha</span>
				</span>
			  </span>
			</span>
		  </p>

		  <p className="font_0 wixui-rich-text__text" style={{fontSize:"16px", lineHeight:"1.41em"}}>
			<span style={{fontSize:"16px"}} className="wixui-rich-text__text">
			  <span className="wixui-rich-text__text">
				<span className="color_11 wixui-rich-text__text">
				  <span style={{letterSpacing:"normal"}} className="wixui-rich-text__text">Andes and Amazon Field School</span>
				</span>
			  </span>
			</span>
		  </p>

		  <p className="font_0 wixui-rich-text__text" style={{fontSize:"16px", lineHeight:"1.41em"}}>
			<span style={{fontSize:"16px"}} className="wixui-rich-text__text">
			  <span className="wixui-rich-text__text">
				<span className="color_11 wixui-rich-text__text">
				  <span style={{letterSpacing:"normal"}} className="wixui-rich-text__text">Shayarina Amazonian Resilience</span>
				</span>
			  </span>
			</span>
		  </p>
		</div> */}
			<Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
				<div className="fixed inset-0 z-10" />
				<Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
					<div className="flex items-center justify-between">
						<NavLink exact to="/" onClick={() => {closeModal();  setMobileMenuOpen(false);}}>
							<img className="h-10 w-auto" src={logo} alt="logo" ></img>
						</NavLink>
						<button
							type="button"
							className="-m-2.5 rounded-md p-2.5 text-black"
							onClick={() => setMobileMenuOpen(false)}
						>
							<span className="sr-only">Close menu</span>
							<XMarkIcon className="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
					{isLoaded && sessionUser ? (
						<>
							<br></br>
							<MobileSearchBar setMobileMenuOpen={setMobileMenuOpen}></MobileSearchBar>
							<div className="mt-6 flow-root">
								<div className="-my-6 divide-y divide-gray-500/10">
									<div className="space-y-2 py-6">
										<Link
											to="/login"
											className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-assitant leading-7 text-black hover:bg-slate-100 hover:text-iyarina-light-green"
										>
											{sessionUser.profile_picture ?
												<img className="profile-button-image inline" src={sessionUser.profile_picture}></img>
												:
												<i className="fas fa-user-circle inline" style={{ fontSize: "32px" }} />

											}
											&nbsp; View Profile
										</Link>
										<Disclosure as="div" className="-mx-3">
											{({ open }) => (
												<>
													<Disclosure.Button className="flex w-full items-center text-black justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-assitant leading-7 hover:bg-slate-100 hover:text-iyarina-light-green">
														Activities
														<ChevronDownIcon
															className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
															aria-hidden="true"
														/>
													</Disclosure.Button>
													<Disclosure.Panel className="mt-2 space-y-2">
														{[...whatWeDoLinks].map((item) => (
															<Link
																key={item.name}
																as="a"
																to={item.href}
																onClick={() => { setMobileMenuOpen(false); closeModal() }}
																className="block rounded-lg py-2 pl-6 pr-3 text-sm font-assitant leading-7 text-black hover:bg-slate-100 hover:text-iyarina-light-green"
															>
																<item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
																{item.name}
															</Link>
														))}
													</Disclosure.Panel>
												</>
											)}
										</Disclosure>
									</div>
									<div className="py-6">
										<div

											className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-assitant leading-7 text-black hover:bg-slate-100 hover:text-iyarina-light-green"
											onClick={handleLogout}
										>
											Log Out
										</div>
									</div>
								</div>
							</div>
						</>

					) : (
						<>
							<div className="py-6">
								<Link
									to="/login"
									className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-assitant leading-7 text-black hover:bg-slate-100 hover:text-iyarina-light-green"
								>
									Log in
								</Link>
								<Link
									to="/signup"
									className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-assitant leading-7 text-black hover:bg-slate-100 hover:text-iyarina-light-green"
								>
									Sign up
								</Link>
							</div></>
					)}

				</Dialog.Panel>
			</Dialog>

		</header>

	);
}

export default Navigation;
