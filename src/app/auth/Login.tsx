import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "primereact/button";

import { useApp } from "../common/stores/app.store";

import { LoginFormModel } from "./login-form.model";
import LoginFormInfo from "../info/login-form.info";
import LoginForm from "./LoginForm";

const Login = () => {
	const { formState, control, handleSubmit } = useForm<LoginFormModel>({
		defaultValues: LoginFormInfo.getFormDefaults(),
		resolver: yupResolver(LoginFormInfo.getFormSchema())
	});
	const { errors, isSubmitting } = formState;

	const [errorMsg, setErrorMsg] = useState("");
	const { login, setLoading } = useApp();
	const navigate = useNavigate();

	const onSubmit = async (data: LoginFormModel) => {
		setErrorMsg("");

		setLoading(true);
		const result = await login(data.email, data.password);
		setLoading(false);

		if (!result) {
			return setErrorMsg("Username + password combination not found.");
		}

		navigate("/dashboard");
	};

	const renderError = () => {
		if (!errorMsg) return undefined;
		return <div className="error mb-2">{errorMsg}</div>;
	};

	return (
		<main>
			<h2>Welcome back!</h2>
			<div className="s-1" />
			<LoginForm control={control} errors={errors} />

			{renderError()}

			<Button
				label="Login"
				onClick={handleSubmit(onSubmit)}
				disabled={isSubmitting}
			/>
		</main>
	);
};

export default Login;
