import { useState } from "react";

import { Button } from "primereact/button";

import { TradeEntryFormModel } from "../forms/trade-entry/TradeLog";
import TradeTable from "../components/trade-table/TradeTable";
import AddTradeDialog from "../components/add-trade-dialog/AddTradeDialog";

const TradeEntry = () => {
	const [trades, setTrades] = useState<TradeEntryFormModel[]>([]);
	const [addDialog, setAddDialog] = useState(false);

	const stageTrade = (trade: TradeEntryFormModel) =>
		setTrades([...trades, trade]);

	const onAddTradeClick = () => setAddDialog(true);

	return (
		<main>
			<h2>Trade Entry</h2>
			<div className="s-1" />
			<p>Stage and submit trades</p>

			<div className="s-2" />

			<Button
				label="Add Trade"
				onClick={onAddTradeClick}
				className="p-button-sm p-button-secondary"
			/>
			<div className="s-1" />
			<TradeTable trades={trades} />

			<div className="s-2" />

			<Button label="Submit Trades" />

			<AddTradeDialog
				stageTrade={stageTrade}
				visible={addDialog}
				setVisible={setAddDialog}
			/>
		</main>
	);
};

export default TradeEntry;
