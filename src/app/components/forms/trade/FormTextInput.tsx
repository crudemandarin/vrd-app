import { Control, Controller, FieldErrors } from "react-hook-form";

import { InputText } from "primereact/inputtext";

import { TradeFormModel } from "../../../models/trade-form.model";

interface Props {
	id: keyof TradeFormModel;
	label: string;
	control: Control<TradeFormModel>;
	errors: FieldErrors<TradeFormModel>;
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
