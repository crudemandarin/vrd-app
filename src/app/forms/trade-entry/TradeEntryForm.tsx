import { Control, Controller, FieldErrors } from "react-hook-form";

import { InputText } from "primereact/inputtext";

import { TradeEntryFormModel } from "./TradeEntryInfo";

import "../../styles/form-styles.css";

interface Props {
	control: Control<TradeEntryFormModel>;
	errors: FieldErrors<TradeEntryFormModel>;
}

const TradeEntryForm = ({ control, errors }: Props) => {
	return (
		<form className="flex flex-wrap">
			<div className="form-input-container">
				<label>Deal Date</label>
				<div>
					<Controller
						name="dealDate"
						control={control}
						render={({ field }) => (
							<InputText
								{...field}
								placeholder="Deal Date"
								className="p-inputtext-sm"
							/>
						)}
					/>
				</div>
				<small className="p-error block">{errors?.dealDate?.message}</small>
			</div>
			<div className="form-input-container">
				<label>Commodity</label>
				<div>
					<Controller
						name="commodity"
						control={control}
						render={({ field }) => (
							<InputText
								{...field}
								placeholder="Commodity"
								className="p-inputtext-sm"
							/>
						)}
					/>
				</div>
				<small className="p-error block">{errors?.commodity?.message}</small>
			</div>
			<div className="form-input-container">
				<label>Deal Type</label>
				<div>
					<Controller
						name="dealType"
						control={control}
						render={({ field }) => (
							<InputText
								{...field}
								placeholder="Deal Type"
								className="p-inputtext-sm"
							/>
						)}
					/>
				</div>
				<small className="p-error block">{errors?.dealType?.message}</small>
			</div>
			<div className="form-input-container">
				<label>Deal Type</label>
				<div>
					<Controller
						name="settlementType"
						control={control}
						render={({ field }) => (
							<InputText
								{...field}
								placeholder="Settlement Type"
								className="p-inputtext-sm"
							/>
						)}
					/>
				</div>
				<small className="p-error block">
					{errors?.settlementType?.message}
				</small>
			</div>
			<div className="form-input-container">
				<label>Trader Name</label>
				<div>
					<Controller
						name="traderName"
						control={control}
						render={({ field }) => (
							<InputText
								{...field}
								placeholder="Trader Name"
								className="p-inputtext-sm"
							/>
						)}
					/>
				</div>
				<small className="p-error block">{errors?.traderName?.message}</small>
			</div>
			<div className="form-input-container">
				<label>Transaction</label>
				<div>
					<Controller
						name="transaction"
						control={control}
						render={({ field }) => (
							<InputText
								{...field}
								placeholder="Transaction"
								className="p-inputtext-sm"
							/>
						)}
					/>
				</div>
				<small className="p-error block">{errors?.transaction?.message}</small>
			</div>
			<div className="form-input-container">
				<label>Counter Party</label>
				<div>
					<Controller
						name="counterParty"
						control={control}
						render={({ field }) => (
							<InputText
								{...field}
								placeholder="Counter Party"
								className="p-inputtext-sm"
							/>
						)}
					/>
				</div>
				<small className="p-error block">{errors?.transaction?.message}</small>
			</div>
		</form>
	);
};

export default TradeEntryForm;
