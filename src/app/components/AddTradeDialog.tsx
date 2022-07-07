import React, { useEffect } from "react";

import { useForm } from "react-hook-form";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

import Util from "../utils/Util";

import TradeEntryForm from "../forms/trade-entry/TradeEntryForm";
import {
	TradeEntryFormDefaults,
	TradeEntryFormModel
} from "../forms/trade-entry/TradeEntryInfo";

interface Props {
	stageTrade: (data: TradeEntryFormModel) => void;
	visible: boolean;
	setVisible: (value: React.SetStateAction<boolean>) => void;
}

const AddTradeDialog = ({ stageTrade, visible, setVisible }: Props) => {
	const { formState, setValue, handleSubmit, reset, control } =
		useForm<TradeEntryFormModel>({
			defaultValues: TradeEntryFormDefaults
		});
	const { errors, isSubmitting } = formState;

	useEffect(() => setValue("dealId", Util.generateId()));

	const onHide = () => {
		setVisible(false);
		reset();
	};

	const onSubmit = (data: TradeEntryFormModel) => {
		stageTrade(data);
		setVisible(false);
		reset();
	};

	const onReset = () => reset();

	const onCancel = () => {
		setVisible(false);
		reset();
	};

	const footer = (
		<>
			<Button
				label="Add"
				icon="pi pi-plus"
				type="submit"
				disabled={isSubmitting}
				className="p-button-success p-button-sm"
				onClick={handleSubmit(onSubmit)}
			/>
			<Button
				label="Reset"
				type="reset"
				disabled={isSubmitting}
				className="p-button-secondary p-button-sm"
				onClick={onReset}
			/>
			<Button
				label="Cancel"
				disabled={isSubmitting}
				className="p-button-secondary p-button-sm"
				onClick={onCancel}
			/>
		</>
	);

	return (
		<Dialog
			header="Add Trade to Stage"
			footer={footer}
			visible={visible}
			onHide={onHide}
			style={{ width: "860px" }}
		>
			<TradeEntryForm control={control} errors={errors} />
		</Dialog>
	);
};

export default AddTradeDialog;
