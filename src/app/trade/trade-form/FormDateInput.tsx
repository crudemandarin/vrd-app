import { useEffect, useState } from "react";

import {
	FieldErrors,
	UseFormGetValues,
	UseFormSetValue,
	UseFormWatch
} from "react-hook-form";

import { Calendar, CalendarChangeParams } from "primereact/calendar";

import Util from "../../common/utils/Util";
import { TradeFormModel } from "../trade.model";

interface Props {
	id: keyof TradeFormModel;
	label: string;
	watch: UseFormWatch<TradeFormModel>;
	getValues: UseFormGetValues<TradeFormModel>;
	setValue: UseFormSetValue<TradeFormModel>;
	errors: FieldErrors<TradeFormModel>;
}

const FormDateInput = ({
	id,
	label,
	watch,
	getValues,
	setValue,
	errors
}: Props) => {
	const [localValue, setLocalValue] = useState<Date | Date[] | undefined>(
		undefined
	);

	useEffect(() => {
		const value = getValues(id);
		if (!value) setLocalValue(undefined);
		else setLocalValue(new Date(getValues(id) as string));
	}, [watch(id)]);

	const onChange = (event: CalendarChangeParams) => {
		if (!(event.value instanceof Date)) return;
		setValue(id, Util.dateToString(event.value));
	};

	return (
		<div className="form-input-container">
			<label>{label}</label>
			<div>
				<Calendar value={localValue} onChange={onChange} showIcon />
			</div>
			<small className="p-error block">{errors[id]?.message}</small>
		</div>
	);
};

export default FormDateInput;
