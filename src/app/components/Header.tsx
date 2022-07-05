import "../styles/header-styles.css";

import Nav from "./Nav";

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
