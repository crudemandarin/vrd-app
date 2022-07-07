import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
	TradeModel,
	TRADE_DEFAULTS
} from "../forms/trade-entry/TradeEntryInfo";
import TradeForm from "../forms/trade/TradeForm";

const Dashboard = () => {
	const {
		formState,
		watch,
		getValues,
		setValue,
		handleSubmit,
		reset,
		control
	} = useForm<TradeModel>({
		defaultValues: TRADE_DEFAULTS
	});
	const { errors, isSubmitting } = formState;

	useEffect(() => {
		reset({ ...getValues(), contractName: "" });
	}, [watch("commodity")]);

	useEffect(() => {
		reset({ ...getValues(), settlementLocation: "" });
	}, [watch("market")]);

	return (
		<main>
			<h2>Dashboard</h2>

			<TradeForm
				watch={watch}
				getValues={getValues}
				setValue={setValue}
				control={control}
				errors={errors}
			/>
		</main>
	);
};

export default Dashboard;
