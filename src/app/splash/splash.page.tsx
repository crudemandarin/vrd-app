import LoginForm from "./login-form/LoginForm";

import "./splash.styles.css";

const Splash = () => {
	return (
		<main className="flex justify-content-center">
			<div className="hero">
				<div>
					<div className="title">Virtual Risk Desk</div>
				</div>
				<div>
					<LoginForm />
				</div>
			</div>
		</main>
	);
};

export default Splash;
