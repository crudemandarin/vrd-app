import axios from "axios";
import { LoginPayloadModel } from "./auth.model";

import { BASE_URL } from "../common/utils/config";

class AuthService {
	static async login(
		email: string,
		password: string
	): Promise<LoginPayloadModel> {
		console.log(
			`AuthService.login invoked! username = ${email} password = ${password}`
		);
		const resp = await axios.post(`${BASE_URL}/auth/login`, {
			email,
			password
		});
		const paylod = resp.data as LoginPayloadModel;
		return paylod;
	}
}

export default AuthService;
