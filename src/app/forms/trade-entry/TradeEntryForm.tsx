import { useForm, Controller } from "react-hook-form";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import { TradeEntryFormModel, TradeEntryFormDefaults } from "./TradeEntry";

import "./trade-entry-styles.css";

interface Props {
	onSubmit: (data: TradeEntryFormModel) => void;
}

const TradeEntryForm = ({ onSubmit }: Props) => {
	const { formState, handleSubmit, reset, control } =
		useForm<TradeEntryFormModel>({
			defaultValues: TradeEntryFormDefaults
		});
	const { errors, isSubmitting } = formState;

	const submitCallback = (data: TradeEntryFormModel) => {
		onSubmit(data);
		reset();
	};

	const onReset = () => reset();

	return (
		<form onSubmit={handleSubmit(submitCallback)} onReset={onReset}>
			<div className="flex flex-wrap">
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
					<small className="p-error block">
						{errors?.transaction?.message}
					</small>
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
					<small className="p-error block">
						{errors?.transaction?.message}
					</small>
				</div>
			</div>

			<div className="s-1" />

			<div className="flex">
				<Button
					label="Add"
					type="submit"
					disabled={isSubmitting}
					className="p-button-sm"
				/>
				<div className="s-1" />
				<Button
					label="Reset"
					type="reset"
					disabled={isSubmitting}
					className="p-button-secondary p-button-sm"
				/>
			</div>
		</form>
	);
};

export default TradeEntryForm;
