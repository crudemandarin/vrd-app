import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

import Util from "../../utils/Util";
import { TradeFormModel } from "../../models/trade-form.model";
import TradeFormInfo from "../../info/trade-form.info";
import TradeForm from "../forms/trade/TradeForm";

interface Props {
	stageTrade: (data: TradeFormModel) => void;
	visible: boolean;
	setVisible: (value: React.SetStateAction<boolean>) => void;
}

const AddTradeDialog = ({ stageTrade, visible, setVisible }: Props) => {
	const {
		formState,
		watch,
		getValues,
		setValue,
		handleSubmit,
		reset,
		control
	} = useForm<TradeFormModel>({
		defaultValues: TradeFormInfo.getFormDefaults(),
		resolver: yupResolver(TradeFormInfo.getFormSchema())
	});
	const { errors, isSubmitting } = formState;

	useEffect(() => setValue("trade_id", Util.generateId()), [visible]);

	const onHide = () => {
		setVisible(false);
		reset(TradeFormInfo.getFormDefaults());
	};

	const onSubmit = (data: TradeFormModel) => {
		stageTrade(data);
		setVisible(false);
		reset(TradeFormInfo.getFormDefaults());
	};

	const onReset = () => reset(TradeFormInfo.getFormDefaults());

	const onCancel = () => {
		setVisible(false);
		reset(TradeFormInfo.getFormDefaults());
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

export default AddTradeDialog;
