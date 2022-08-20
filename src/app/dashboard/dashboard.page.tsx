import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useSWR from "swr";

import { Button } from "primereact/button";

import { BASE_URL } from "../common/utils/config";
import fetcher from "../common/utils/fetcher";
import { useApp } from "../common/stores/app.store";
import BasicTable from "../common/components/BasicTable";

import { TradeModel, TradeFormModel } from "../trade/trade.model";
import TradeService from "../trade/trade.service";
import TradeInfo from "../trade/info/trade.info";
import EditTradeDialog from "../trade/dialogs/EditTradeDialog";

const Dashboard = () => {
	const navigate = useNavigate();
	const { token, logout } = useApp();

	const { data, error, mutate } = useSWR(
		[`${BASE_URL}/trades`, token],
		fetcher
	);

	if (error?.response?.status === 401) logout();
	const trades: TradeModel[] = data ? data.trades : [];

	const [selectedTrade, setSelectedTrade] = useState<TradeModel | undefined>(
		undefined
	);
	const [editDialogVisible, setEditDialogVisible] = useState(false);

	const updateTrade = async (update: TradeFormModel) => {
		await TradeService.updateTrade(update.trade_id, update, token);
		setSelectedTrade(undefined);
		mutate();
	};

	const toggleActive = async (trade: TradeModel) => {
		await TradeService.toggleActive(trade.trade_id, token);
		setSelectedTrade(undefined);
		mutate();
	};

	const onAddTradeClick = () => navigate("/trade-entry");

	const onEditTradeClick = () => setEditDialogVisible(true);

	const onToggleActive = () => {
		if (!selectedTrade) return;
		toggleActive(selectedTrade);
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
			<h2>Dashboard</h2>

			<div className="s-2" />

			<h3> View Trades </h3>

			<div className="s-1" />

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
					label="Toggle Active"
					onClick={onToggleActive}
					className="p-button-sm p-button-secondary"
					disabled={!selectedTrade}
				/>
			</div>

			<div className="s-1" />

			<BasicTable
				rows={trades}
				columns={TradeInfo.getColumns()}
				defaultColumns={TradeInfo.getDefaultColumns()}
				selected={selectedTrade}
				setSelected={setSelectedTrade}
			/>

			{renderEditDialog()}
		</main>
	);
};

export default Dashboard;
