import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

import { TradeModel } from "../models/trade.model";
import Error404 from "./Error404";
import TradeFormInfo from "../info/trade-form.info";

interface LocationState {
	trades: TradeModel[];
}

const TradeSubmission = () => {
	const [columns] = useState(TradeFormInfo.getColumns());

	const location = useLocation();
	const state = location.state as LocationState;
	if (!state || !state?.trades.length) return <Error404 />;
	const { trades } = state;

	const renderColumns = () =>
		columns.map((col) => (
			<Column key={`col-${col.field}`} field={col.field} header={col.header} />
		));

	return (
		<main>
			<h2>Submission Confirmation</h2>
			<div className="s-1" />
			<p>Your trades submission has been uploaded to our system.</p>

			<div className="s-2" />

			<DataTable value={trades} showGridlines responsiveLayout="scroll">
				{renderColumns()}
			</DataTable>

			<div className="s-2" />

			<p className="caption">
				Made a mistake?{" "}
				<NavLink to="/dashboard">Modify trades on the Dashboard</NavLink>
			</p>
			<p className="caption">
				<NavLink to="/trade-entry">Have more trades to enter?</NavLink>
			</p>
		</main>
	);
};

export default TradeSubmission;
