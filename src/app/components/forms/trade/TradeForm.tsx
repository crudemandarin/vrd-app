import { useEffect, useState } from "react";

import {
	Control,
	FieldErrors,
	UseFormGetValues,
	UseFormReset,
	UseFormSetValue,
	UseFormWatch
} from "react-hook-form";

import { TradeFormModel } from "../../../models/trade.form.model";
import { FormField } from "../../../models/form.model";
import TradeFormInfo from "../../../info/trade-form.info";
import FormTextInput from "./FormTextInput";
import FormAutoSelect from "./FormAutoSelect";
import FormDateInput from "./FormDateInput";
import "../../../styles/form-styles.css";

interface Props {
	watch: UseFormWatch<TradeFormModel>;
	getValues: UseFormGetValues<TradeFormModel>;
	setValue: UseFormSetValue<TradeFormModel>;
	reset: UseFormReset<TradeFormModel>;
	control: Control<TradeFormModel>;
	errors: FieldErrors<TradeFormModel>;
}

const TradeForm = ({
	watch,
	getValues,
	setValue,
	reset,
	control,
	errors
}: Props) => {
	const [fields] = useState<FormField<TradeFormModel>[]>(
		TradeFormInfo.getFormFields()
	);

	// Reset `contract_name` if option not valid with `commodity`
	useEffect(() => {
		const key = getValues("commodity");
		const field = fields.filter((f) => f.id === "contract_name")[0];
		if (!key || !field.cond)
			return reset({ ...getValues(), contract_name: "" });
		const options = field.cond.options[key];
		const value = getValues("contract_name");
		if (!options.includes(value)) reset({ ...getValues(), contract_name: "" });
	}, [watch("commodity")]);

	// Reset `settlement_location` if option not valid with `market`
	useEffect(() => {
		const key = getValues("market");
		const field = fields.filter((f) => f.id === "settlement_location")[0];
		if (!key || !field.cond)
			return reset({ ...getValues(), settlement_location: "" });
		const options = field.cond.options[key];
		const value = getValues("settlement_location");
		if (!options.includes(value))
			reset({ ...getValues(), settlement_location: "" });
	}, [watch("market")]);

	return (
		<form className="flex flex-wrap">
			{TradeFormInfo.getFormFields().map((info) => {
				if (info.options) {
					return (
						<FormAutoSelect
							key={info.id}
							id={info.id}
							options={info.options}
							label={info.label}
							watch={watch}
							getValues={getValues}
							setValue={setValue}
							errors={errors}
						/>
					);
				}

				if (info.cond) {
					const optionKey = getValues(info.cond.key);
					const options = optionKey ? info.cond.options[optionKey] : [];
					return (
						<FormAutoSelect
							key={info.id}
							id={info.id}
							options={options}
							label={info.label}
							watch={watch}
							getValues={getValues}
							setValue={setValue}
							errors={errors}
						/>
					);
				}

				if (info.type === "date") {
					return (
						<FormDateInput
							key={info.id}
							id={info.id}
							label={info.label}
							watch={watch}
							getValues={getValues}
							setValue={setValue}
							errors={errors}
						/>
					);
				}

				return (
					<FormTextInput
						key={info.id}
						id={info.id}
						label={info.label}
						control={control}
						errors={errors}
					/>
				);
			})}
		</form>
	);
};

export default TradeForm;
