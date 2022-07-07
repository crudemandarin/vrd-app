import { useState } from "react";

import { Button } from "primereact/button";

import { TradeEntryFormModel } from "../forms/trade-entry/TradeEntryInfo";
import TradeTable from "../components/TradeTable";
import AddTradeDialog from "../components/dialog/AddTradeDialog";
import EditTradeDialog from "../components/dialog/EditTradeDialog";

import Util from "../utils/Util";

const TradeEntry = () => {
	const [trades, setTrades] = useState<TradeEntryFormModel[]>([]);

	const [addDialogVisible, setAddDialogVisible] = useState(false);
	const [editDialogVisible, setEditDialogVisible] = useState(false);

	const [selectedTrade, setSelectedTrade] = useState<
		TradeEntryFormModel | undefined
	>(undefined);

	const stageTrade = (trade: TradeEntryFormModel) =>
		setTrades([...trades, trade]);

	const updateTrade = (update: TradeEntryFormModel) => {
		console.log("update trade", update);

		const updateIndex = trades.findIndex(
			(trade) => trade.dealId === update.dealId
		);
		const updatedTrades = [...trades];
		updatedTrades[updateIndex] = update;

		setTrades(updatedTrades);
	};

	const onAddTradeClick = () => setAddDialogVisible(true);

	const onEditTradeClick = () => setEditDialogVisible(true);

	const onDuplicateTradeClick = () => {
		if (!selectedTrade) return;
		const updateTrade = { ...selectedTrade };
		updateTrade.dealId = Util.generateId();
		const updatedTrades = [...trades, updateTrade];
		setTrades(updatedTrades);
		setSelectedTrade(undefined);
	};

	const onDeleteTradeClick = () => {
		if (!selectedTrade) return;
		const updatedTrades = trades.filter(
			(trade) => trade.dealId != selectedTrade.dealId
		);
		setTrades(updatedTrades);
		setSelectedTrade(undefined);
	};

	const renderEditDialog = () => {
		if (!selectedTrade) return undefined;
		return (
			<EditTradeDialog
				trade={selectedTrade}
				updateTrade={updateTrade}
				visible={editDialogVisible}
				setVisible={setEditDialogVisible}
			/>
		);
	};

	return (
		<main>
			<h2>Trade Entry</h2>
			<div className="s-1" />
			<p>Stage and submit trades</p>

			<div className="s-2" />

			<div className="flex">
				<Button
					label="Add"
					onClick={onAddTradeClick}
					className="p-button-sm p-button-secondary"
				/>
				<div className="s-1" />
				<Button
					label="Edit"
					onClick={onEditTradeClick}
					className="p-button-sm p-button-secondary"
					disabled={!selectedTrade}
				/>
				<div className="s-1" />
				<Button
					label="Duplicate"
					onClick={onDuplicateTradeClick}
					className="p-button-sm p-button-secondary"
					disabled={!selectedTrade}
				/>
				<div className="s-1" />
				<Button
					label="Delete"
					onClick={onDeleteTradeClick}
					className="p-button-sm p-button-secondary"
					disabled={!selectedTrade}
				/>
			</div>

			<div className="s-1" />
			<TradeTable
				trades={trades}
				selected={selectedTrade}
				setSelected={setSelectedTrade}
			/>

			<div className="s-2" />

			<Button label="Submit Trades" />

			<AddTradeDialog
				stageTrade={stageTrade}
				visible={addDialogVisible}
				setVisible={setAddDialogVisible}
			/>

			{renderEditDialog()}
		</main>
	);
};

export default TradeEntry;
