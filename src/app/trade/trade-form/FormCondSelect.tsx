import { useEffect, useState } from "react";
import {
	FieldErrors,
	UseFormGetValues,
	UseFormReset,
	UseFormSetValue,
	UseFormWatch
} from "react-hook-form";

import { ConditionalOption } from "../../common/models/form.model";

import { TradeFormModel } from "../trade.model";
import FormAutoSelect from "./FormAutoSelect";

interface Props {
	id: keyof TradeFormModel;
	label: string;
	cond: ConditionalOption<TradeFormModel>;
	watch: UseFormWatch<TradeFormModel>;
	getValues: UseFormGetValues<TradeFormModel>;
	setValue: UseFormSetValue<TradeFormModel>;
	reset: UseFormReset<TradeFormModel>;
	errors: FieldErrors<TradeFormModel>;
}

const FormCondSelect = ({
	id,
	label,
	cond,
	watch,
	getValues,
	setValue,
	reset,
	errors
}: Props) => {
	const [options, setOptions] = useState<string[]>([]);

	useEffect(() => {
		const option_key = getValues(cond.key);
		const updated = option_key ? cond.options[option_key] : [];
		setOptions(updated);
	}, [watch(cond.key)]);

	// Reset [id] if option not valid with cond.options[cond.key->value]
	useEffect(() => {
		const value = getValues(id) as string;
		if (!options.includes(value)) reset({ ...getValues(), [id]: "" });
	}, [options]);

	return (
		<FormAutoSelect
			id={id}
			options={options}
			label={label}
			watch={watch}
			getValues={getValues}
			setValue={setValue}
			errors={errors}
		/>
	);
};

export default FormCondSelect;
