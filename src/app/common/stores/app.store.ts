import create from "zustand";
import { devtools, persist } from "zustand/middleware";

import { User } from "../../auth/auth.model";
import AuthService from "../../auth/auth.service";
import { TradeModel } from "../../trade/trade.model";

interface AppStore {
	loading: boolean;
	setLoading: (loading: boolean) => void;
	token: string;
	user: User | undefined;
	login: (email: string, password: string) => Promise<true>;
	trades: TradeModel[];
	setTrades: (trades: TradeModel[]) => void;
}

export const useApp = create<AppStore>()(
	devtools(
		persist((set) => ({
			loading: false,
			setLoading: (loading) => set({ loading }),
			token: "",
			user: undefined,
			login: async (email, password) => {
				set({ loading: true });
				const { token, user } = await AuthService.login(email, password);
				set({ loading: false, token, user });
				return true;
			},
			trades: [],
			setTrades: (trades) => set({ trades })
		}))
	)
);