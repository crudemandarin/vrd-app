export interface TradeEntryFormModel {
	dealDate: string;
	commodity: string;
	dealType: string;
	settlementType: string;
	market: string;
	settlementMarket: string;
	traderName: string;
	// dealId: string;
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
	dealDate: "",
	commodity: "",
	dealType: "",
	settlementType: "",
	market: "",
	settlementMarket: "",
	traderName: "",
	dealId: "",
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

export const TradeLogNames = {
	dealDate: "Deal Date",
	dealType: "Deal Type",
	settlementType: "Settlement Type",
	settlementMarket: "Settlement Market",
	traderName: "Trader Name",
	counterParty: "Counter Party",
	otherCounterParty: "Other Counter Party",
	setPoint: "SET Point",
	setLocation: "SET Location",
	subBook: "Sub Book",
	startDate: "Start Date",
	endDate: "End Date",
	expirationDate: "Expiration Date",
	strikePrice: "Strike Price"
};