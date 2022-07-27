import Nav from "./Nav";

import "../styles/header-styles.css";

const Header = () => {
	return (
		<header>
			<div className="header-banner">
				<div>
					<h1 className="title">Virtual Risk Desk</h1>
				</div>
				<div>
					<p>My Account</p>
				</div>
			</div>

			<Nav />
		</header>
	);
};

export default Header;