import * as yup from "yup";

import { LoginFormModel } from "../auth/login-form.model";

class LoginFormInfo {
	static getFormDefaults(): LoginFormModel {
		return {
			email: "",
			password: ""
		};
	}

	static getFormSchema() {
		return yup.object().shape({
			email: yup.string().email().required(),
			password: yup.string().min(8).max(64).required()
		});
	}
}

export default LoginFormInfo;
