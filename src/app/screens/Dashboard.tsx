import { Button } from "primereact/button";
import { useEffect, useState } from "react";

import BasicTable from "../components/BasicTable";
import EditTradeDialog from "../components/dialog/EditTradeDialog";
import { TradeModel } from "../models/trade.model";
import TradeService from "../services/trade.service";

const Dashboard = () => {
	const [trades, setTrades] = useState<TradeModel[]>([]);
	const [selectedTrade, setSelectedTrade] = useState<TradeModel | undefined>(
		undefined
	);

	const [refreshFlag, setRefreshFlag] = useState(false);
	const [editDialogVisible, setEditDialogVisible] = useState(false);

	useEffect(() => {
		const getData = async () => {
			const updated = await TradeService.getTrades();
			setTrades(updated);
		}

		getData();
	}, [refreshFlag]);

	const updateTrade = async (update: TradeModel) => {
		const result = await TradeService.updateTrade(update.id, update);
		console.log("result =", result);
		setSelectedTrade(undefined);
		setRefreshFlag(!refreshFlag);
	};

	const onEditTradeClick = () => setEditDialogVisible(true);

	const onDeactivateClick = () => {
		console.log("deactivate click")
	}

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
				columns={TradeService.getColumns()}
				defaultColumns={TradeService.getDefaultColumns()}
				selected={selectedTrade}
				setSelected={setSelectedTrade}
			/>

			{renderEditDialog()}
		</main>
	);
};

export default Dashboard;
