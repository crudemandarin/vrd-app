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
