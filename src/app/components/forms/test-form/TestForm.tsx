import { useForm, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

interface TestFormModel {
	username: string;
	email: string;
}

const TestFormSchema = yup.object().shape({
	username: yup.string().min(5).required(),
	// password: yup.string().min(8).required(),
	email: yup.string().email().required()
	// phoneNumber: yup.string().min(10).required()
});

const TestFormDefaults = {
	username: "",
	email: ""
};

const TestForm = () => {
	const { formState, handleSubmit, reset, control } = useForm<TestFormModel>({
		resolver: yupResolver(TestFormSchema),
		defaultValues: TestFormDefaults
	});
	const { errors, isSubmitting } = formState;

	const onSubmit = (data: TestFormModel) => {
		console.log(data);
		reset();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label>Username</label>
				<div>
					<Controller
						name="username"
						control={control}
						render={({ field }) => (
							<InputText {...field} placeholder="Username" />
						)}
					/>
				</div>
				<small className="p-error block">{errors?.username?.message}</small>
			</div>
			<div>
				<label>Email</label>
				<div>
					<Controller
						name="email"
						control={control}
						render={({ field }) => <InputText {...field} placeholder="Email" />}
					/>
				</div>
				<small className="p-error block">{errors?.email?.message}</small>
			</div>

			<Button label="Submit" type="submit" disabled={isSubmitting} />
		</form>
	);
};

export default TestForm;
