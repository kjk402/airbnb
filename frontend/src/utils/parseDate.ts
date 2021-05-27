export default function parseDate(str: any): Date {
	const regex = /[^0-9]/g; // 숫자가 아닌 문자열을 선택하는 정규식
	const result = str.replace(regex, "-").split("-"); // 원래 문자열에서 숫자가 아닌 모든 문자열을 빈 문자로 변경
	const year = Number(result[0]);
	const month = Number(result[2]);
	const day = Number(result[4]);
	return new Date(year, month - 1, day);
}
