import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { MultiSelect, MultiSelectChangeParams } from "primereact/multiselect";
import { useState } from "react";

interface Props<T> {
	rows: T[];
	columns: ColumnField[];
	defaultColumns?: ColumnField[];
	selected: T | undefined;
	setSelected: (value: React.SetStateAction<T | undefined>) => void;
}

interface ColumnField {
	field: string;
	header: string;
}

const BasicTable = <T,>({
	rows,
	columns,
	defaultColumns = undefined,
	selected,
	setSelected
}: Props<T>) => {
	const [selectedColumns, setSelectedColumns] = useState(
		defaultColumns ?? columns
	);

	const onColumnToggle = (event: MultiSelectChangeParams) => {
		const cols = event.value as ColumnField[];
		const updatedCols = columns.filter((col) =>
			cols.some((sCol) => sCol.field === col.field)
		);
		setSelectedColumns(updatedCols);
	};

	const renderColumns = () =>
		selectedColumns.map((col) => (
			<Column key={`col-${col.field}`} field={col.field} header={col.header} sortable />
		));

	const header = (
		<div style={{ textAlign: "left" }}>
			<MultiSelect
				value={selectedColumns}
				options={columns}
				optionLabel="header"
				onChange={onColumnToggle}
				style={{ width: "20em" }}
			/>
		</div>
	);

	return (
		<>
			<DataTable
				value={rows}
				header={header}
				selection={selected}
				selectionMode="single"
				onSelectionChange={(e) => setSelected(e.value)}
				size="small"
				responsiveLayout="scroll"
				resizableColumns
				showGridlines
				rows={10}
				paginator
			>
				{renderColumns()}
			</DataTable>
		</>
	);
};

export default BasicTable;
