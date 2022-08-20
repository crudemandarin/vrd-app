import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

import Util from "../common/utils/Util";
import { useApp } from "../common/stores/app.store";
import BasicTable from "../common/components/BasicTable";
import TradeService from "./trade.service";

import { TradeFormModel } from "./trade.model";
import TradeFormInfo from "./info/trade-form.info";
import AddTradeDialog from "./dialogs/AddTradeDialog";
import EditTradeDialog from "./dialogs/EditTradeDialog";

const TradeEntry = () => {
	const { token } = useApp();

	const navigate = useNavigate();

	const [trades, setTrades] = useState<TradeFormModel[]>([]);

	const [addDialogVisible, setAddDialogVisible] = useState(false);
	const [editDialogVisible, setEditDialogVisible] = useState(false);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [selectedTrade, setSelectedTrade] = useState<
		TradeFormModel | undefined
	>(undefined);

	const stageTrade = (trade: TradeFormModel) => {
		setTrades([...trades, trade]);
	};

	const updateTrade = (update: TradeFormModel) => {
		const updateIndex = trades.findIndex(
			(trade) => trade.trade_id === update.trade_id
		);
		const updatedTrades = [...trades];
		updatedTrades[updateIndex] = update;
		setTrades(updatedTrades);
	};

	const submitTrades = async (staged: TradeFormModel[]) => {
		setIsSubmitting(true);
		try {
			const result = await TradeService.createTrades(trades, token);
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
		updateTrade.trade_id = Util.generateId();
		const updatedTrades = [...trades, updateTrade];
		setTrades(updatedTrades);
		setSelectedTrade(undefined);
	};

	const onDeleteTradeClick = () => {
		if (!selectedTrade) return;
		const updatedTrades = trades.filter(
			(trade) => trade.trade_id != selectedTrade.trade_id
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
		return <div className="error mb-2">{errorMsg}</div>;
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
			<p>Create, edit, and stage up trades to be submitted to our system.</p>

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
				columns={TradeFormInfo.getColumns()}
				defaultColumns={TradeFormInfo.getDefaultColumns()}
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
