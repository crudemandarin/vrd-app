import { useEffect, useMemo } from "react";

import {
	Control,
	FieldErrors,
	UseFormGetValues,
	UseFormReset,
	UseFormSetValue,
	UseFormWatch
} from "react-hook-form";

import { TradeModel } from "../../../models/trade.model";
import TradeService from "../../../services/trade.service";

import FormTextInput from "./FormTextInput";
import FormAutoSelect from "./FormAutoSelect";
import FormDateInput from "./FormDateInput";

import "../../../styles/form-styles.css";

interface Props {
	watch: UseFormWatch<TradeModel>;
	getValues: UseFormGetValues<TradeModel>;
	setValue: UseFormSetValue<TradeModel>;
	reset: UseFormReset<TradeModel>;
	control: Control<TradeModel>;
	errors: FieldErrors<TradeModel>;
}

const TradeForm = ({
	watch,
	getValues,
	setValue,
	reset,
	control,
	errors
}: Props) => {
	useEffect(() => {
		reset({ ...getValues(), contractName: "" });
	}, [watch("commodity")]);

	useEffect(() => {
		reset({ ...getValues(), settlementLocation: "" });
	}, [watch("market")]);

	const renderedInputs = useMemo(
		() =>
			TradeService.getFormFields().map((info) => {
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
