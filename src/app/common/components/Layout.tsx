import { NavLink, Outlet } from "react-router-dom";

import AuthWidget from "../../auth/AuthWidget";

const Layout = () => {
	return (
		<>
			<header>
				<div className="header-banner">
					<h1 className="header-title">Virtual Risk Desk</h1>
					<AuthWidget />
				</div>
				<nav>
					<NavLink to="/dashboard">Dashboard</NavLink>
					<NavLink to="/trade-entry">Trade Entry</NavLink>
				</nav>
			</header>
			<Outlet />
		</>
	);
};

export default Layout;
