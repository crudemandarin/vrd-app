class TradeInfo {
	static getColumns() {
		return [
			{ field: "trade_id", header: "Trade ID" },
			{ field: "created_by", header: "Created By" },
			{ field: "created_at", header: "Created At" },
			{ field: "updated_by", header: "Updated By" },
			{ field: "updated_at", header: "Updated At" },
			{ field: "active", header: "Trade ID" },
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
}

export default TradeInfo;
