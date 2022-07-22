import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import useSWR from "swr";

import { BASE_URL } from "../utils/config";
import fetcher from "../utils/fetcher";
import { TradeModel } from "../models/trade.model";
import { TradeFormModel } from "../models/trade.form.model";
import TradeInfo from "../info/trade.info";
import TradeService from "../services/trade.service";
import BasicTable from "../components/BasicTable";
import EditTradeDialog from "../components/dialog/EditTradeDialog";

const Dashboard = () => {
	const { data, mutate } = useSWR(`${BASE_URL}/trades`, fetcher);

	const [trades, setTrades] = useState<TradeModel[]>([]);
	const [selectedTrade, setSelectedTrade] = useState<TradeModel | undefined>(
		undefined
	);

	const [editDialogVisible, setEditDialogVisible] = useState(false);

	useEffect(() => {
		if (data) setTrades(data.trades);
	}, [data]);

	const updateTrade = async (update: TradeFormModel) => {
		const result = await TradeService.updateTrade(update.trade_id, update);
		console.log("result =", result);
		setSelectedTrade(undefined);
		mutate();
	};

	const onEditTradeClick = () => setEditDialogVisible(true);

	const onDeactivateClick = () => {
		console.log("deactivate click");
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
			<p>Welcome back, USER</p>

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
					label="Deactivate"
					onClick={onDeactivateClick}
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
