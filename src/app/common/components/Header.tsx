import Nav from "./Nav";

import "../styles/header-styles.css";
import AuthWidget from "../../auth/AuthWidget";

const Header = () => {
	return (
		<header>
			<div className="header-banner">
				<div>
					<h1 className="header-title">Virtual Risk Desk</h1>
				</div>

				<div>
					<AuthWidget />
				</div>
			</div>

			<Nav />
		</header>
	);
};

export default Header;
