import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Button } from "primereact/button";

import AddTradeDialog from "../components/dialog/AddTradeDialog";
import EditTradeDialog from "../components/dialog/EditTradeDialog";

import Util from "../utils/Util";

import BasicTable from "../components/BasicTable";
import { TradeModel } from "../models/trade.model";
import TradeService from "../services/trade.service";

const TradeEntry = () => {
	const navigate = useNavigate();

	const [trades, setTrades] = useState<TradeModel[]>([]);

	const [addDialogVisible, setAddDialogVisible] = useState(false);
	const [editDialogVisible, setEditDialogVisible] = useState(false);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [selectedTrade, setSelectedTrade] = useState<TradeModel | undefined>(
		undefined
	);

	const stageTrade = (trade: TradeModel) => {
		setTrades([...trades, trade]);
	};

	const updateTrade = (update: TradeModel) => {
		const updateIndex = trades.findIndex((trade) => trade.id === update.id);
		const updatedTrades = [...trades];
		updatedTrades[updateIndex] = update;
		setTrades(updatedTrades);
	};

	const submitTrades = async (staged: TradeModel[]) => {
		setIsSubmitting(true);
		try {
			const result = await TradeService.createTrades(trades);
			console.log("result =", result);
			navigate("/trade-submission", { state: { trades: staged } });
		} catch (err) {
			console.error("Failed to post trades. Error =", err);
			setErrorMsg("Failed to upload trades. Please try again.");
		}
		setIsSubmitting(false);
	};

	const onAddTradeClick = () => setAddDialogVisible(true);

	const onEditTradeClick = () => setEditDialogVisible(true);

	const onDuplicateTradeClick = () => {
		if (!selectedTrade) return;
		const updateTrade = { ...selectedTrade };
		updateTrade.id = Util.generateId();
		const updatedTrades = [...trades, updateTrade];
		setTrades(updatedTrades);
		setSelectedTrade(undefined);
	};

	const onDeleteTradeClick = () => {
		if (!selectedTrade) return;
		const updatedTrades = trades.filter(
			(trade) => trade.id != selectedTrade.id
		);
		setTrades(updatedTrades);
		setSelectedTrade(undefined);
	};

	const onSubmitClick = async () => {
		console.log("submit clicked, trades =", trades);
		setErrorMsg("");
		submitTrades(trades);
	};

	const renderError = () => {
		if (!errorMsg) return undefined;
		return (
			<div className="error mb-2">
				{" "}
				Failed to upload trades. Please try again.{" "}
			</div>
		);
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
			<BasicTable
				rows={trades}
				columns={TradeService.getColumns()}
				defaultColumns={TradeService.getDefaultColumns()}
				selected={selectedTrade}
				setSelected={setSelectedTrade}
			/>

			<div className="s-2" />

			{renderError()}

			<div>
				<Button
					label="Submit Trades"
					onClick={onSubmitClick}
					disabled={isSubmitting || trades.length === 0}
				/>
			</div>

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
