import styled from "styled-components";
import Week from "./Week";

interface ConProps {
	month: number;
}
export default function CalendarCon({ month }: ConProps) {
	return (
		<StyleCalendar>
			<HeaderWrapper>2021년 {month}월</HeaderWrapper>
			<BodyWrapper>
				<WeekHeader>
					<StyleDay>일</StyleDay>
					<StyleDay>월</StyleDay>
					<StyleDay>화</StyleDay>
					<StyleDay>수</StyleDay>
					<StyleDay>목</StyleDay>
					<StyleDay>금</StyleDay>
					<StyleDay>토</StyleDay>
				</WeekHeader>
				<Week />
				<Week />
				<Week />
				<Week />
				<Week />
				<Week />
			</BodyWrapper>
		</StyleCalendar>
	);
}
const StyleCalendar = styled.div`
	width: 336px;
	height: 336px;
	/* border: 1px solid black; */
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
`;
