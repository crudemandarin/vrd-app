import { v4 } from "uuid";

class Util {
	static generateId(): string {
		return v4();
	}

	static dateToString(date: Date): string {
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		return `${month}/${day}/${year}`;
	}
}

export default Util;
