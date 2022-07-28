import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";

import { LoginFormModel } from "./login-form.model";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginFormInfo from "./login-form.info";
import { Button } from "primereact/button";
import { useState } from "react";
import { useApp } from "../../common/stores/app.store";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
	const { login, setLoading } = useApp();
	const navigate = useNavigate();

	const { formState, control, handleSubmit } = useForm<LoginFormModel>({
		defaultValues: LoginFormInfo.getFormDefaults(),
		resolver: yupResolver(LoginFormInfo.getFormSchema())
	});
	const { errors, isSubmitting } = formState;

	const [errorMsg, setErrorMsg] = useState("");

	const onSubmit = async (data: LoginFormModel) => {
		setErrorMsg("");
		setLoading(true);
		console.log("onSubmit!");

		try {
			await login(data.email, data.password);
		} catch (err: unknown) {
			console.log("Login failed. err =", err);
			return setErrorMsg("Username + password combination not found.");
		}

		navigate("/dashboard");
	};

	const renderError = () => {
		console.log("err=", errorMsg);
		if (!errorMsg) return undefined;
		return (
			<div className="p-error" style={{ marginTop: "0.5rem" }}>
				{errorMsg}
			</div>
		);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<div>
					<div>
						<Controller
							name="email"
							control={control}
							render={({ field }) => (
								<InputText {...field} placeholder="Email Address" />
							)}
						/>
					</div>
					<small className="p-error block">{errors?.email?.message}</small>
				</div>

				<div className="s-1" />

				<div>
					<div>
						<Controller
							name="password"
							control={control}
							render={({ field }) => (
								<InputText {...field} placeholder="Password" />
							)}
						/>
					</div>
					<small className="p-error block">{errors?.password?.message}</small>
				</div>

				<div className="s-1" />

				<Button label="Sign In" type="submit" disabled={isSubmitting} />
			</div>

			{renderError()}
		</form>
	);
};

export default LoginForm;
