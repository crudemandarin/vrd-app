import {
	Control,
	FieldErrors,
	UseFormGetValues,
	UseFormReset,
	UseFormSetValue,
	UseFormWatch
} from "react-hook-form";

import { TradeFormModel } from "../trade.model";
import TradeFormInfo from "../info/trade-form.info";
import FormTextInput from "./FormTextInput";
import FormAutoSelect from "./FormAutoSelect";
import FormDateInput from "./FormDateInput";
import FormCondSelect from "./FormCondSelect";

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
					return (
						<FormCondSelect
							key={info.id}
							id={info.id}
							cond={info.cond}
							label={info.label}
							watch={watch}
							getValues={getValues}
							setValue={setValue}
							reset={reset}
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
