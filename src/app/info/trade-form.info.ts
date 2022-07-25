import * as yup from "yup";

import { FormField } from "../models/form.model";
import { TradeFormModel } from "../models/trade-form.model";

class TradeFormInfo {
	static getColumns() {
		return [
			{ field: "trade_id", header: "Trade ID" },
			{ field: "trade_date", header: "Trade Date" },
			{ field: "trade_type", header: "Trade Type" },
			{ field: "market", header: "Market" },
			{ field: "commodity", header: "Commodity" },
			{ field: "contract_name", header: "Contract Name" },
			{ field: "settlement_type", header: "Settlement Type" },
			{ field: "settlement_market", header: "Settlement Market" },
			{ field: "trader_name", header: "Trader Name" },
			{ field: "counter_party", header: "Counter Party" },
			{ field: "other_counter_party", header: "Other Counter Party" },
			{ field: "settlement_point", header: "Settlement Point" },
			{
				field: "settlement_location",
				header: "Settlement Location"
			},
			{ field: "book", header: "Book" },
			{ field: "transaction", header: "Transaction" },
			{ field: "delivery_start", header: "Start Delivery Date" },
			{ field: "delivery_end", header: "End Delivery Date" },
			{ field: "volume", header: "Volume" },
			{ field: "price", header: "Price" },
			{ field: "fee", header: "Fee" },
			{ field: "strike", header: "Strike" }
		];
	}

	static getDefaultColumns() {
		return [
			{ field: "trade_date", header: "Trade Date" },
			{ field: "market", header: "Market" },
			{ field: "commodity", header: "Commodity" },
			{ field: "contract_name", header: "Contract Name" },
			{ field: "settlement_market", header: "Settlement Market" },
			{ field: "settlement_location", header: "Settlement Location" },
			{ field: "transaction", header: "Transaction" },
			{ field: "volume", header: "Volume" },
			{ field: "price", header: "Price" },
			{ field: "strike", header: "Strike" }
		];
	}

	static getFormDefaults(): TradeFormModel {
		return {
			trade_id: "",
			trade_date: "",
			trade_type: "",
			market: "",
			commodity: "",
			contract_name: "",
			settlement_type: "",
			settlement_market: "",
			trader_name: "",
			counter_party: "",
			other_counter_party: "",
			settlement_point: "",
			settlement_location: "",
			book: "",
			transaction: "",
			delivery_start: "",
			delivery_end: "",
			expiration: "",
			volume: 0,
			price: 0,
			fee: 0,
			strike: 0
		};
	}

	static getFormSchema() {
		return yup.object().shape({
			trade_id: yup.string().required(),
			trade_date: yup.string().required(),
			trade_type: yup.string().required(),
			market: yup.string().required(),
			commodity: yup.string().required(),
			contract_name: yup.string().required(),
			settlement_type: yup.string().required(),
			settlement_market: yup.string().required(),
			trader_name: yup.string().required(),
			counter_party: yup.string(),
			other_counter_party: yup.string(),
			settlement_point: yup.string().required(),
			settlement_location: yup.string().required(),
			book: yup.string(),
			transaction: yup.string().required(),
			delivery_start: yup.string(),
			delivery_end: yup.string(),
			expiration: yup.string(),
			volume: yup.number().required(),
			price: yup.number().required(),
			fee: yup.number().required(),
			strike: yup.number().required()
		});
	}

	static getFormFields(): FormField<TradeFormModel>[] {
		return [
			{
				id: "trade_date",
				label: "Trade Date",
				type: "date"
			},
			{
				id: "trade_type",
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
				id: "contract_name",
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
				id: "settlement_type",
				label: "Settlement Type",
				options: ["Financial", "Physical"]
			},
			{
				id: "settlement_market",
				label: "Settlement Market",
				options: ["Real Time", "Day Ahead", "N/A"]
			},
			{
				id: "trader_name",
				label: "Trader Name"
			},
			{
				id: "counter_party",
				label: "Counter Party"
			},
			{
				id: "other_counter_party",
				label: "Other Counter Party"
			},
			{
				id: "settlement_point",
				label: "Settlement Point",
				options: ["Hub", "Zone"]
			},
			{
				id: "settlement_location",
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
				id: "delivery_start",
				label: "Start Delivery Date",
				type: "date"
			},
			{
				id: "delivery_end",
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
	}
}

export default TradeFormInfo;
