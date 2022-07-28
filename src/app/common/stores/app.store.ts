import jwtDecode from "jwt-decode";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

import { TokenPayloadModel, User } from "../../auth/auth.model";
import AuthService from "../../auth/auth.service";

interface IAppStore {
	loading: boolean;
	setLoading: (loading: boolean) => void;
	token: string;
	user: User | undefined;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
}

export const useApp = create<IAppStore>()(
	devtools(
		persist(
			(set) => ({
				loading: false,
				setLoading: (loading) => set({ loading }),
				token: "",
				user: undefined,
				login: async (email, password) => {
					set({ loading: true });
					const { token } = await AuthService.login(email, password);
					const { user } = jwtDecode<TokenPayloadModel>(token);
					set({ loading: false, token, user });
				},
				logout: () => {
					set({ token: "" });
					set({ user: undefined });
				}
			}),
			{
				name: "app-storage",
				getStorage: () => sessionStorage
			}
		)
	)
);
