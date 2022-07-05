import { useState } from "react";

import { Button } from "primereact/button";

import { TradeEntryFormModel } from "../forms/trade-entry/TradeEntryModel";
import TradeTable from "../components/TradeTable";
import AddTradeDialog from "../components/AddTradeDialog";
import EditTradeDialog from "../components/EditTradeDialog";

const TradeEntry = () => {
	const [trades, setTrades] = useState<TradeEntryFormModel[]>([]);
	const [addDialog, setAddDialog] = useState(false);
	const [editDialog, setEditDialog] = useState(false);

	const stageTrade = (trade: TradeEntryFormModel) =>
		setTrades([...trades, trade]);

	const updateTrade = (trade: TradeEntryFormModel) => {
		console.log("update trade", trade);
	};

	const onAddTradeClick = () => setAddDialog(true);
	const onEditTradeClick = () => setEditDialog(true);

	return (
		<main>
			<h2>Trade Entry</h2>
			<div className="s-1" />
			<p>Stage and submit trades</p>

			<div className="s-2" />

			<div className="flex">
				<Button
					label="Add Trade"
					onClick={onAddTradeClick}
					className="p-button-sm p-button-secondary"
				/>
				<div className="s-1" />
				<Button
					label="Edit Trade"
					onClick={onEditTradeClick}
					className="p-button-sm p-button-secondary"
				/>
			</div>

			<div className="s-1" />
			<TradeTable trades={trades} />

			<div className="s-2" />

			<Button label="Submit Trades" />

			<AddTradeDialog
				stageTrade={stageTrade}
				visible={addDialog}
				setVisible={setAddDialog}
			/>

			<EditTradeDialog
				updateTrade={updateTrade}
				visible={editDialog}
				setVisible={setEditDialog}
			/>
		</main>
	);
};

export default TradeEntry;
