import { useEffect, useState } from "react";

import {
	FieldErrors,
	UseFormGetValues,
	UseFormSetValue,
	UseFormWatch
} from "react-hook-form";

import { Calendar, CalendarChangeParams } from "primereact/calendar";

import { TradeModel } from "../../../models/trade.model";
import Util from "../../../utils/Util";

interface Props {
	id: keyof TradeModel;
	label: string;
	watch: UseFormWatch<TradeModel>;
	getValues: UseFormGetValues<TradeModel>;
	setValue: UseFormSetValue<TradeModel>;
	errors: FieldErrors<TradeModel>;
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
		else setLocalValue(new Date(getValues(id)));
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
