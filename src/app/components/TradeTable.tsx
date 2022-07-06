import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

import { TradeEntryFormModel } from "../forms/trade-entry/TradeEntryModel";

interface Props {
	trades: TradeEntryFormModel[];
	selected: TradeEntryFormModel | undefined;
	setSelected: (
		value: React.SetStateAction<TradeEntryFormModel | undefined>
	) => void;
}

const TradeTable = ({ trades, selected, setSelected }: Props) => {
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
			<DataTable
				value={trades}
				selection={selected}
				selectionMode="single"
				onSelectionChange={(e) => setSelected(e.value)}
			>
				{renderColumns()}
			</DataTable>
		</>
	);
};

export default TradeTable;
