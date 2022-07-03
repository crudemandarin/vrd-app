import { useState } from "react";

import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

import { TradeEntryFormModel } from "../../forms/trade-entry/TradeLog";

interface Props {
	trades: TradeEntryFormModel[];
}

const TradeTable = ({ trades }: Props) => {
	const [selected, setSelected] = useState<TradeEntryFormModel | undefined>(
		undefined
	);

	const columns = [
		{ field: "dealDate", header: "Deal Date" },
		{ field: "commodity", header: "Commodity" },
		{ field: "dealType", header: "Deal Type" },
		{ field: "settlementType", header: "Settlement Type" }
	];

	const renderColumns = () =>
		columns.map((col) => (
			<Column key={`col-${col.field}`} field={col.field} header={col.header} />
		));

	return (
		<>
			<DataTable value={trades} selection={selected} selectionMode="single">
				{renderColumns()}
			</DataTable>
		</>
	);
};

export default TradeTable;
