import { useEffect, useState } from "react";

import { Control, Controller, FieldErrors } from "react-hook-form";

import {
	AutoComplete,
	AutoCompleteCompleteMethodParams
} from "primereact/autocomplete";

import { TradeModel } from "../../../models/trade.model";

interface Props {
	id: keyof TradeModel;
	label: string;
	options: string[];
	control: Control<TradeModel>;
	errors: FieldErrors<TradeModel>;
}

const FormAutoSelect = ({ id, label, options, control, errors }: Props) => {
	const [filtered, setFiltered] = useState<string[]>([]);

	useEffect(() => {
		setFiltered(options);
	}, [options]);

	const search = (event: AutoCompleteCompleteMethodParams) => {
		const query = event.query.trim().toLowerCase();
		let updated: string[];
		if (!query.length) updated = [...options];
		else
			updated = options.filter((option) =>
				option.toLowerCase().includes(query)
			);
		setFiltered(updated);
	};

	return (
		<div className="form-input-container">
			<label>{label}</label>
			<div>
				<Controller
					name={id}
					control={control}
					render={({ field }) => (
						<AutoComplete
							{...field}
							dropdown
							suggestions={filtered}
							completeMethod={search}
						/>
					)}
				/>
			</div>
			<small className="p-error block">{errors[id]?.message}</small>
		</div>
	);
};

export default FormAutoSelect;
