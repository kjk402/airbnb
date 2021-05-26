interface Props {
	year: number;
	month: number;
	firstWeekDay: number;
}
export default function Day({ year, month, firstWeekDay }: Props) {
	console.log(d);
	return <>{d >= firstWeekDay && <td>{d}</td>}</>;
}
