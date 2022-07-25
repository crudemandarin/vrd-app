import { useEffect, useState } from "react";

import {
	FieldErrors,
	UseFormGetValues,
	UseFormSetValue,
	UseFormWatch
} from "react-hook-form";

import {
	AutoComplete,
	AutoCompleteChangeParams,
	AutoCompleteCompleteMethodParams
} from "primereact/autocomplete";

import { TradeFormModel } from "../../../models/trade-form.model";

interface Props {
	id: keyof TradeFormModel;
	label: string;
	options: string[];
	watch: UseFormWatch<TradeFormModel>;
	getValues: UseFormGetValues<TradeFormModel>;
	setValue: UseFormSetValue<TradeFormModel>;
	errors: FieldErrors<TradeFormModel>;
}

const FormAutoSelect = ({
	id,
	label,
	options,
	watch,
	getValues,
	setValue,
	errors
}: Props) => {
	const [localValue, setLocalValue] = useState("");
	const [filtered, setFiltered] = useState<string[]>([]);

	useEffect(() => {
		const value = getValues(id) as string;
		if (!value) setLocalValue("");
		else setLocalValue(value);
	}, [watch(id)]);

	useEffect(() => {
		setFiltered(options);
	}, [options]);

	const onChange = (event: AutoCompleteChangeParams) => {
		const value = event.value;
		setLocalValue(value);
		if (options.includes(value)) setValue(id, value);
	};

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
				<AutoComplete
					value={localValue}
					onChange={onChange}
					completeMethod={search}
					suggestions={filtered}
					dropdown
				/>
			</div>
			<small className="p-error block">{errors[id]?.message}</small>
		</div>
	);
};

export default FormAutoSelect;
