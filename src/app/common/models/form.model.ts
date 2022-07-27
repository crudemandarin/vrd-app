export interface ConditionalOption<T> {
	options: { [key: string]: string[] };
	key: keyof T;
}

export interface FormField<T> {
	id: keyof T;
	label: string;
	default?: string | number;
	options?: string[];
	cond?: ConditionalOption<T>;
	type?: "date";
}
