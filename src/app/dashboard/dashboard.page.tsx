import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import useSWR from "swr";

import { BASE_URL } from "../common/utils/config";
import fetcher from "../common/utils/fetcher";
import BasicTable from "../common/components/BasicTable";

import TradeService from "../trade/trade.service";

import { TradeModel, TradeFormModel } from "../trade/trade.model";
import TradeInfo from "../trade/info/trade.info";
import EditTradeDialog from "../trade/dialogs/EditTradeDialog";

import { useApp } from "../common/stores/app.store";

const Dashboard = () => {
	const { token, user, trades, setTrades } = useApp();
	const { data, mutate } = useSWR([`${BASE_URL}/trades`, token], fetcher);

	const [selectedTrade, setSelectedTrade] = useState<TradeModel | undefined>(
		undefined
	);
	const [editDialogVisible, setEditDialogVisible] = useState(false);

	useEffect(() => {
		if (data) setTrades(data.trades);
	}, [data]);

	const updateTrade = async (update: TradeFormModel) => {
		const result = await TradeService.updateTrade(
			update.trade_id,
			update,
			token
		);
		console.log("result =", result);
		setSelectedTrade(undefined);
		mutate();
	};

	const toggleActive = async (trade: TradeModel) => {
		const result = await TradeService.toggleActive(trade.trade_id, token);
		console.log("result =", result);
		setSelectedTrade(undefined);
		mutate();
	};

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
			<div className="s-1" />
			<p>Welcome back, {user?.first_name}</p>

			<div className="s-2" />

			<h3> View Trades </h3>

			<div className="s-1" />

			<div className="flex">
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
