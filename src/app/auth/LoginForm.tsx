import { Control, Controller, FieldErrors } from "react-hook-form";
import { InputText } from "primereact/inputtext";

import { LoginFormModel } from "./login-form.model";

interface Props {
	control: Control<LoginFormModel>;
	errors: FieldErrors<LoginFormModel>;
}

const LoginForm = ({ control, errors }: Props) => {
	return (
		<form>
			<div className="form-input-container">
				<label>Email Address</label>
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
			<div className="form-input-container">
				<label>Password</label>
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
		</form>
	);
};

export default LoginForm;
