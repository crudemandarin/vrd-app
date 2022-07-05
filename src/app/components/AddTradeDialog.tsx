import React from "react";

import { Dialog } from "primereact/dialog";

import TradeEntryForm from "../forms/trade-entry/TradeEntryForm";
import { TradeEntryFormModel } from "../forms/trade-entry/TradeEntry";

interface Props {
	stageTrade: (data: TradeEntryFormModel) => void;
	visible: boolean;
	setVisible: (value: React.SetStateAction<boolean>) => void;
}

const AddTradeDialog = ({ stageTrade, visible, setVisible }: Props) => {
	const onHide = () => setVisible(false);

	const onSubmit = (data: TradeEntryFormModel) => {
		stageTrade(data);
		setVisible(false);
	};

	return (
		<Dialog
			header="Add Trade to Stage"
			visible={visible}
			onHide={onHide}
			style={{ width: "860px" }}
		>
			<TradeEntryForm onSubmit={onSubmit} />
		</Dialog>
	);
};

export default AddTradeDialog;
