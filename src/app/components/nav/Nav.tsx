import { NavLink } from "react-router-dom";

import "./nav-styles.css";

const Nav = () => {
	return (
		<nav>
			<NavLink to="/dashboard">Dashboard</NavLink>
			<NavLink to="/trade-entry">Trade Entry</NavLink>
		</nav>
	);
};

export default Nav;
