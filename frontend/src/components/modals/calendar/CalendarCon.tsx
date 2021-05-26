import styled from "styled-components";
// import Week from "./Week";
import Day from "./Day";

interface ConProps {
	data: Date;
}
export default function CalendarCon({ data }: ConProps) {
	const year = data.getFullYear();
	const month = data.getMonth() + 1;
	const lastDay = new Date(year, month, 0).getDate();
	const dayList = [];
	for (let i = 1; i <= lastDay; i++) dayList.push(i);
	const firstWeekDay = data.getDay();
	const weekList = [];
	const weekTitleList = ["일", "월", "화", "수", "목", "금", "토"];
	const weekDayTitleList = [];
	let d = 1 - firstWeekDay;
	const sevenDays = [];
	for (let i = 0; i < 7; i++) sevenDays.push(<Day year={year} month={month} firstWeekDay={firstWeekDay} />);
	for (let i = 0; i < 7; i++) {
		weekList.push([
			<Week>
				<td>{d}</td>
				<td>{++d}</td>
				<td>{++d}</td>
				<td>{++d}</td>
				<td>{++d}</td>
				<td>{++d}</td>
				<td>{++d}</td>
			</Week>,
		]);
		d++;
		weekDayTitleList.push(<StyleDay>{weekTitleList[i]}</StyleDay>);
	}

	return (
		<StyleCalendar>
			<HeaderWrapper>
				{year}년 {month}월
			</HeaderWrapper>
			<BodyWrapper>
				<tbody>
					<WeekHeader>{weekDayTitleList}</WeekHeader>
					{weekList}
				</tbody>
			</BodyWrapper>
		</StyleCalendar>
	);
}
const StyleCalendar = styled.div`
	width: 336px;
	height: 336px;
	font-size: 12px;
	margin: 0 30px;
`;

const HeaderWrapper = styled.div`
	display: flex;
	justify-content: center;
	font-size: 16px;
`;
const BodyWrapper = styled.table`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const WeekHeader = styled.tr`
	display: flex;
	justify-content: space-between;
	td {
		width: 48px;
		height: 48px;
	}
`;

const StyleDay = styled.td`
	display: flex;
	justify-content: center;
	align-items: center;
	td {
		width: 48px;
		height: 48px;
	}
`;

const Week = styled.tr`
	display: flex;
	justify-content: space-between;
	td {
		width: 48px;
		height: 48px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 30px;
		:hover {
			border: 1px solid #b8b8b8;
			cursor: pointer;
		}
	}
`;
