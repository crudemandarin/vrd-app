import { Control, Controller, FieldErrors } from "react-hook-form";

import { InputText } from "primereact/inputtext";

import { TradeModel } from "../../../models/trade.model";

interface Props {
	id: keyof TradeModel;
	label: string;
	control: Control<TradeModel>;
	errors: FieldErrors<TradeModel>;
}

const FormTextInput = ({ id, label, control, errors }: Props) => {
	return (
		<div className="form-input-container">
			<label>{label}</label>
			<div>
				<Controller
					name={id}
					control={control}
					render={({ field }) => <InputText {...field} />}
				/>
			</div>
			<small className="p-error block">{errors[id]?.message}</small>
		</div>
	);
};

export default FormTextInput;
