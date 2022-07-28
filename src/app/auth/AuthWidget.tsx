import { Button } from "primereact/button";
import { useApp } from "../common/stores/app.store";

const AuthWidget = () => {
	const { user, token, logout } = useApp();

	if (!user || !token) return <div>Sign in to get started</div>;

	return (
		<div className="flex" style={{ alignItems: "center" }}>
			<div>Welcome back, {user.first_name}</div>
			<div className="s-2" />
			<Button label="Logout" onClick={logout} className="p-button-sm" />
		</div>
	);
};

export default AuthWidget;
