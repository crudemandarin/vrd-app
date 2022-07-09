import { FormField } from "../models/form.model";
import { TradeModel } from "../models/trade.model";

const TRADE_INFO: FormField<TradeModel>[] = [
	{
		id: "id",
		label: "Trade ID"
	},
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
		id: "deliveryDateStart",
		label: "Start Delivery Date",
		type: "date"
	},
	{
		id: "deliveryDateEnd",
		label: "End Delivery Date",
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

const TRADE_DEFAULTS = {
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
	deliveryDateStart: "",
	deliveryDateEnd: "",
	volume: 0,
	price: 0,
	fee: 0,
	strike: 0
};

const TRADE_COLUMNS = [
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
	{ field: "settlementLocation", header: "Settlement Location" },
	{ field: "book", header: "Book" },
	{ field: "transaction", header: "Transaction" },
	{ field: "deliveryDateStart", header: "Start Delivery Date" },
	{ field: "deliveryDateEnd", header: "End Delivery Date" },
	{ field: "volume", header: "Volume" },
	{ field: "price", header: "Price" },
	{ field: "fee", header: "Fee" },
	{ field: "strike", header: "Strike" }
];

class TradeService {
	static getFormFields(): FormField<TradeModel>[] {
		return TRADE_INFO;
	}

	static getFormDefaults(): TradeModel {
		return TRADE_DEFAULTS;
	}

	static getColumns() {
		return TRADE_COLUMNS;
	}
}

export default TradeService;
