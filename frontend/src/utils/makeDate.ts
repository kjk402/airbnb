export default function makeDate(str: any): Date {
	const regex = /[^0-9]/g;
	const result = str.replace(regex, "-").split("-");
	const year = Number(result[0]);
	const month = Number(result[2]);
	const day = Number(result[4]);
	return new Date(year, month - 1, day);
}
