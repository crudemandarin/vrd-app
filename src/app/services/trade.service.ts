import axios from "axios";
import * as yup from "yup";

import { FormField } from "../models/form.model";
import { TradeModel } from "../models/trade.model";

const BASE_URL = "http://localhost:5050";

class TradeService {
	static getFormFields(): FormField<TradeModel>[] {
		return FORM_FIELDS;
	}

	static getFormDefaults(): TradeModel {
		return FORM_DEFAULTS;
	}

	static getFormSchema() {
		return FORM_SCHEMA;
	}

	static getColumns() {
		return COLUMNS;
	}

	static getDefaultColumns() {
		return DEFAULT_COLUMNS;
	}

	static async getTrades(): Promise<TradeModel[]> {
		console.log("TradeService.getTrades invoked!");
		const resp = await axios.get(`${BASE_URL}/trades`);
		const { trades } = resp.data;
		return trades;
	}

	static async createTrade(trade: TradeModel) {
		console.log("TradeService.createTrade invoked! trade =", trade);
		const result = await axios.post(`${BASE_URL}/trade`, { trade });
		return result;
	}

	static async createTrades(trades: TradeModel[]) {
		console.log("TradeService.createTrades invoked! trades =", trades);
		const result = await axios.post(`${BASE_URL}/trades`, { trades });
		return result;
	}

	static async updateTrade(id: string, updates: TradeModel) {
		console.log(
			`TradeService.createTrades invoked! id = ${id} updates = ${updates}`
		);
		const result = await axios.put(`${BASE_URL}/trade`, { id, updates });
		return result;
	}
}

export default TradeService;

const FORM_FIELDS: FormField<TradeModel>[] = [
	{
		id: "date",
		label: "Trade Date",
		type: "date"
	},
	{
		id: "type",
		label: "Trade Type",
		options: ["Block", "Profile", "Option"]
	},
	{
		id: "market",
		label: "Market",
		options: ["NYMEX", "ERCOT", "PJM"]
	},
	{
		id: "commodity",
		label: "Commodity",
		options: ["Natural Gas", "Copper", "Power"]
	},
	{
		id: "contractName",
		label: "Contract Name",
		cond: {
			options: {
				"Natural Gas": ["NGF23", "NGQ23"],
				Copper: ["HGN22", "HGM23"],
				Power: ["5x16", "7x16", "7x8"]
			},
			key: "commodity"
		}
	},
	{
		id: "settlementType",
		label: "Settlement Type",
		options: ["Financial", "Physical"]
	},
	{
		id: "settlementMarket",
		label: "Settlement Market",
		options: ["Real Time", "Day Ahead", "N/A"]
	},
	{
		id: "traderName",
		label: "Trader Name"
	},
	{
		id: "counterParty",
		label: "Counter Party"
	},
	{
		id: "otherCounterParty",
		label: "Other Counter Party"
	},
	{
		id: "settlementPoint",
		label: "Settlement Point",
		options: ["Hub", "Zone"]
	},
	{
		id: "settlementLocation",
		label: "Settlement Location",
		cond: {
			key: "market",
			options: {
				NYMEX: ["N/A"],
				ERCOT: ["South", "North", "West"],
				PJM: ["PECO", "PPL", "COMED", "West"]
			}
		}
	},
	{
		id: "book",
		label: "Book"
	},
	{
		id: "transaction",
		label: "Transaction",
		options: ["Buy", "Sell"]
	},
	{
		id: "deliveryStart",
		label: "Start Delivery Date",
		type: "date"
	},
	{
		id: "deliveryEnd",
		label: "End Delivery Date",
		type: "date"
	},
	{
		id: "expiration",
		label: "Expiration Date",
		type: "date"
	},
	{
		id: "volume",
		label: "Volume",
		default: 0
	},
	{
		id: "price",
		label: "Price",
		default: 0
	},
	{
		id: "fee",
		label: "Fee",
		default: 0
	},
	{
		id: "strike",
		label: "Strike",
		default: 0
	}
];

const FORM_DEFAULTS = {
	id: "",
	date: "",
	type: "",
	market: "",
	commodity: "",
	contractName: "",
	settlementType: "",
	settlementMarket: "",
	traderName: "",
	counterParty: "",
	otherCounterParty: "",
	settlementPoint: "",
	settlementLocation: "",
	book: "",
	transaction: "",
	deliveryStart: "",
	deliveryEnd: "",
	expiration: "",
	volume: 0,
	price: 0,
	fee: 0,
	strike: 0
};

const FORM_SCHEMA = yup.object().shape({
	id: yup.string().required(),
	date: yup.string().required(),
	type: yup.string().required(),
	market: yup.string().required(),
	commodity: yup.string().required(),
	contractName: yup.string().required(),
	settlementType: yup.string().required(),
	settlementMarket: yup.string().required(),
	traderName: yup.string().required(),
	counterParty: yup.string(),
	otherCounterParty: yup.string(),
	settlementPoint: yup.string().required(),
	settlementLocation: yup.string().required(),
	book: yup.string(),
	transaction: yup.string().required(),
	deliveryStart: yup.string(),
	deliveryEnd: yup.string(),
	expiration: yup.string(),
	volume: yup.number().required(),
	price: yup.number().required(),
	fee: yup.number().required(),
	strike: yup.number().required()
});

const COLUMNS = [
	{ field: "id", header: "Trade ID" },
	{ field: "date", header: "Trade Date" },
	{ field: "type", header: "Trade Type" },
	{ field: "market", header: "Market" },
	{ field: "commodity", header: "Commodity" },
	{ field: "contractName", header: "Contract Name" },
	{ field: "settlementType", header: "Settlement Type" },
	{ field: "settlementMarket", header: "Settlement Market" },
	{ field: "traderName", header: "Trader Name" },
	{ field: "counterParty", header: "Counter Party" },
	{ field: "otherCounterParty", header: "Other Counter Party" },
	{ field: "settlementPoint", header: "Settlement Point" },
	{
		field: "settlementLocation",
		header: "Settlement Location"
	},
	{ field: "book", header: "Book" },
	{ field: "transaction", header: "Transaction" },
	{ field: "deliveryStart", header: "Start Delivery Date" },
	{ field: "deliveryEnd", header: "End Delivery Date" },
	{ field: "volume", header: "Volume" },
	{ field: "price", header: "Price" },
	{ field: "fee", header: "Fee" },
	{ field: "strike", header: "Strike" }
];

const DEFAULT_COLUMNS = [
	{ field: "date", header: "Trade Date" },
	{ field: "market", header: "Market" },
	{ field: "commodity", header: "Commodity" },
	{ field: "contractName", header: "Contract Name" },
	{ field: "settlementMarket", header: "Settlement Market" },
	{ field: "settlementLocation", header: "Settlement Location" },
	{ field: "transaction", header: "Transaction" },
	{ field: "volume", header: "Volume" },
	{ field: "price", header: "Price" },
	{ field: "strike", header: "Strike" }
];
