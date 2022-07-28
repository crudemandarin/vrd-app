export interface LoginPayloadModel {
	user: User;
	token: string;
}

export interface User {
	user_id: string;
	role: string;
	first_name: string;
	last_name: string;
	email: string;
}

export interface TokenPayloadModel {
	user: User;
	iat: number;
	exp: number;
	iss: string;
}