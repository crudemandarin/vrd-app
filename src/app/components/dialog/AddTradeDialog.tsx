import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

import { TradeModel } from "../../models/trade.model";
import TradeService from "../../services/trade.service";
import TradeForm from "../forms/trade/TradeForm";
import Util from "../../utils/Util";

interface Props {
	stageTrade: (data: TradeModel) => void;
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
	} = useForm<TradeModel>({
		defaultValues: TradeService.getFormDefaults(),
		resolver: yupResolver(TradeService.getFormSchema())
	});
	const { errors, isSubmitting } = formState;

	useEffect(() => setValue("id", Util.generateId()), [visible]);

	const onHide = () => {
		setVisible(false);
		reset(TradeService.getFormDefaults());
	};

	const onSubmit = (data: TradeModel) => {
		stageTrade(data);
		setVisible(false);
		reset(TradeService.getFormDefaults());
	};

	const onReset = () => reset(TradeService.getFormDefaults());

	const onCancel = () => {
		setVisible(false);
		reset(TradeService.getFormDefaults());
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
