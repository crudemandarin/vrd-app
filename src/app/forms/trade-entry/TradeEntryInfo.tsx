export interface TradeEntryFormModel {
	dealId: string;
	dealDate: string;
	commodity: string;
	dealType: string;
	settlementType: string;
	market: string;
	settlementMarket: string;
	traderName: string;
	transaction: string;
	counterParty: string;
	otherCounterParty: string;
	setPoint: string;
	setLocation: string;
	book: string;
	subBook: string;
	shape: string;
	startDate: string;
	endDate: string;
	expirationDate: string;
	volume: string;
	price: string;
	strikePrice: string;
	fee: string;
	firm: string;
}

export const TradeEntryFormDefaults = {
	dealId: "",
	dealDate: "",
	commodity: "",
	dealType: "",
	settlementType: "",
	market: "",
	settlementMarket: "",
	traderName: "",
	transaction: "",
	counterParty: "",
	otherCounterParty: "",
	setPoint: "",
	setLocation: "",
	book: "",
	subBook: "",
	shape: "",
	startDate: "",
	endDate: "",
	expirationDate: "",
	volume: "",
	price: "",
	strikePrice: "",
	fee: "",
	firm: ""
};

//////////////////////////////////////////////////// //////////////////////////////////////////////////// ////////////////////////////////////////////////////

export interface TradeModel {
	id: string;
	date: string;
	type: string;
	market: string;
	commodity: string;
	contractName: string;
	settlementType: string;
	settlementMarket: string;
	traderName: string;
	counterParty: string;
	otherCounterParty: string;
	settlementPoint: string;
	settlementLocation: string;
	book: string;
	transaction: string;
	deliveryDateStart: string;
	deliveryDateEnd: string;
	volume: number;
	price: number;
	fee: number;
	strike: number;

	// subBook: string;
	// shape: string;
	// expirationDate: string;
	// firm: string;
}

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

const TRADE_FIELD_NAMES = {
	id: "id",
	label: "Trade ID",
	date: "Trade Date",
	type: "Trade Type",
	market: "Market",
	commodity: "Commodity",
	contractName: "Contract Name",
	settlementType: "Settlement Type",
	settlementMarket: "Settlement Market",
	traderName: "Trader Name",
	counterParty: "Counter Party",
	otherCounterParty: "Other Counter Party",
	settlementPoint: "Settlement Point",
	settlementLocation: "Settlement Location",
	book: "Book",
	transaction: "Transaction",
	deliveryDateStart: "Start Delivery Date",
	deliveryDateEnd: "End Delivery Date",
	volume: "Volume",
	price: "Price",
	fee: "Fee",
	strike: "Strike"
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

export interface ConditionalOption<T> {
	options: { [key: string]: string[] };
	key: keyof T;
}

interface ModelInfoAttribute<T> {
	id: keyof T;
	label: string;
	default?: string | number;
	options?: string[];
	cond?: ConditionalOption<T>;
	type?: "date";
}

const TRADE_INFO: ModelInfoAttribute<TradeModel>[] = [
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

export { TRADE_DEFAULTS, TRADE_FIELD_NAMES, TRADE_COLUMNS, TRADE_INFO };

/*
const TRADE_DEFAULTS = INFO.reduce(
	(acc, curr) => ({ ...acc, [curr.id]: curr.default ?? "" }),
	{}
);

const TRADE_FIELD_NAMES: TradeModel = INFO.reduce((acc, curr) => ({
	...acc,
	[curr.id]: curr.label
}));

const TRADE_COLUMNS = INFO.map((curr) => ({
	field: curr.id,
	header: curr.label
}));
*/
