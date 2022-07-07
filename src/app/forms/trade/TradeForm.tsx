import {
	Control,
	FieldErrors,
	UseFormGetValues,
	UseFormSetValue,
	UseFormWatch
} from "react-hook-form";

import { TradeModel, TRADE_INFO } from "../trade-entry/TradeEntryInfo";

import "../../styles/form-styles.css";
import FormTextInput from "./FormTextInput";
import FormAutoSelect from "./FormAutoSelect";
import { useMemo } from "react";
import FormDateInput from "./FormDateInput";

interface Props {
	watch: UseFormWatch<TradeModel>;
	getValues: UseFormGetValues<TradeModel>;
	setValue: UseFormSetValue<TradeModel>;
	control: Control<TradeModel>;
	errors: FieldErrors<TradeModel>;
}

const TradeForm = ({ watch, getValues, setValue, control, errors }: Props) => {
	const renderedInputs = useMemo(
		() =>
			TRADE_INFO.map((info) => {
				if (info.options) {
					return (
						<FormAutoSelect
							key={info.id}
							id={info.id}
							options={info.options}
							label={info.label}
							control={control}
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
							control={control}
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
			}),
		[watch("commodity"), watch("market")]
	);

	return <form className="flex flex-wrap">{renderedInputs}</form>;
};

export default TradeForm;
