import axios from "axios";

import { BASE_URL } from "../common/utils/config";

import { TradeModel, TradeFormModel } from "./trade.model";

class TradeService {
	static async getTrades(token: string): Promise<TradeModel[]> {
		console.log("TradeService.getTrades invoked!");
		const resp = await axios.get(`${BASE_URL}/trades`, {
			headers: { Authorization: `Bearer ${token}` }
		});
		const { trades } = resp.data;
		return trades;
	}

	static async createTrade(trade: TradeFormModel, token: string) {
		console.log("TradeService.createTrade invoked! trade =", trade);
		const result = await axios.post(
			`${BASE_URL}/trade`,
			{ trade },
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		return result;
	}

	static async createTrades(trades: TradeFormModel[], token: string) {
		console.log("TradeService.createTrades invoked! trades =", trades);
		const result = await axios.post(
			`${BASE_URL}/trades`,
			{ trades },
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		return result;
	}

	static async updateTrade(
		trade_id: string,
		updates: TradeFormModel,
		token: string
	) {
		console.log(
			`TradeService.updateTrade invoked! trade_id = ${trade_id} updates = ${updates}`
		);
		const result = await axios.put(
			`${BASE_URL}/trade`,
			{ trade_id, updates },
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		return result;
	}

	static async toggleActive(trade_id: string, token: string) {
		console.log(`TradeService.toggleActive invoked! trade_id = ${trade_id}`);
		const result = await axios.put(
			`${BASE_URL}/trade/toggle-active`,
			{ trade_id },
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		return result;
	}
}

export default TradeService;
