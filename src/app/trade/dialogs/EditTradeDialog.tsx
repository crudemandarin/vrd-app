import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

import { TradeFormModel } from "../trade.model";
import TradeFormInfo from "../info/trade-form.info";
import TradeForm from "../trade-form/TradeForm";

interface Props {
	trade: TradeFormModel;
	updateTrade: (data: TradeFormModel) => void;
	visible: boolean;
	setVisible: (value: React.SetStateAction<boolean>) => void;
}

const EditTradeDialog = ({
	trade,
	updateTrade,
	visible,
	setVisible
}: Props) => {
	const {
		formState,
		watch,
		getValues,
		setValue,
		handleSubmit,
		reset,
		control
	} = useForm<TradeFormModel>({
		defaultValues: trade,
		resolver: yupResolver(TradeFormInfo.getFormSchema())
	});
	const { errors, isSubmitting } = formState;

	useEffect(() => reset(trade), [trade]);

	const onHide = () => setVisible(false);

	const onSubmit = (data: TradeFormModel) => {
		updateTrade(data);
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
				label="Edit"
				icon="pi pi-cog"
				type="submit"
				disabled={isSubmitting}
				className="p-button-warning p-button-sm"
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
			header="Edit Trade"
			footer={footer}
			visible={visible}
			onHide={onHide}
			style={{ width: "900px" }}
		>
			<TradeForm
				watch={watch}
				getValues={getValues}
				setValue={setValue}
				reset={reset}
				control={control}
				errors={errors}
			/>
		</Dialog>
	);
};

export default EditTradeDialog;
