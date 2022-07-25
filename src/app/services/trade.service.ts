import axios from "axios";

import { TradeFormModel } from "../models/trade-form.model";
import { TradeModel } from "../models/trade.model";
import { BASE_URL } from "../utils/config";

class TradeService {
	static async getTrades(): Promise<TradeModel[]> {
		console.log("TradeService.getTrades invoked!");
		const resp = await axios.get(`${BASE_URL}/trades`);
		const { trades } = resp.data;
		return trades;
	}

	static async createTrade(trade: TradeFormModel) {
		console.log("TradeService.createTrade invoked! trade =", trade);
		const result = await axios.post(`${BASE_URL}/trade`, { trade });
		return result;
	}

	static async createTrades(trades: TradeFormModel[]) {
		console.log("TradeService.createTrades invoked! trades =", trades);
		const result = await axios.post(`${BASE_URL}/trades`, { trades });
		return result;
	}

	static async updateTrade(id: string, updates: TradeFormModel) {
		console.log(
			`TradeService.updateTrade invoked! id = ${id} updates = ${updates}`
		);
		const result = await axios.put(`${BASE_URL}/trade`, { id, updates });
		return result;
	}

	static async toggleActive(id: string) {
		console.log(`TradeService.toggleActive invoked! id = ${id}`);
		const result = await axios.put(`${BASE_URL}/trade/toggle-active`, { id });
		return result;
	}
}

export default TradeService;
