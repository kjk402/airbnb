import styled from "styled-components";
import Day from "./Day";

interface ConProps {
	data: Date;
	setCheckInValue: React.Dispatch<React.SetStateAction<string | undefined>>;
	setCheckoutValue: React.Dispatch<React.SetStateAction<string | undefined>>;
	checkInValue: string | undefined;
	checkOutValue: string | undefined;
	clickCntRef: React.MutableRefObject<number>;
	filter: Object;
	setFilter: any;
}
export default function CalendarCon({ filter, setFilter, data, setCheckInValue, setCheckoutValue, clickCntRef, checkInValue, checkOutValue }: ConProps) {
	const year = data.getFullYear();
	const month = data.getMonth();
	const lastDay = new Date(year, month, 0).getDate();
	const firstWeekDay = data.getDay();
	const weekList = [];
	const weekTitleList = ["일", "월", "화", "수", "목", "금", "토"];
	const weekDayTitleList = [];
	let day = -firstWeekDay;

	for (let i = 0; i < 7; i++) {
		weekList.push([
			<Week>
				<Day filter={filter} setFilter={setFilter} year={year} month={month} day={++day} lastDay={lastDay} key={`${year}-${month}-${day}`} setCheckInValue={setCheckInValue} setCheckoutValue={setCheckoutValue} clickCntRef={clickCntRef} checkInValue={checkInValue} checkOutValue={checkOutValue} />
				<Day filter={filter} setFilter={setFilter} year={year} month={month} day={++day} lastDay={lastDay} key={`${year}-${month}-${day}`} setCheckInValue={setCheckInValue} setCheckoutValue={setCheckoutValue} clickCntRef={clickCntRef} checkInValue={checkInValue} checkOutValue={checkOutValue} />
				<Day filter={filter} setFilter={setFilter} year={year} month={month} day={++day} lastDay={lastDay} key={`${year}-${month}-${day}`} setCheckInValue={setCheckInValue} setCheckoutValue={setCheckoutValue} clickCntRef={clickCntRef} checkInValue={checkInValue} checkOutValue={checkOutValue} />
				<Day filter={filter} setFilter={setFilter} year={year} month={month} day={++day} lastDay={lastDay} key={`${year}-${month}-${day}`} setCheckInValue={setCheckInValue} setCheckoutValue={setCheckoutValue} clickCntRef={clickCntRef} checkInValue={checkInValue} checkOutValue={checkOutValue} />
				<Day filter={filter} setFilter={setFilter} year={year} month={month} day={++day} lastDay={lastDay} key={`${year}-${month}-${day}`} setCheckInValue={setCheckInValue} setCheckoutValue={setCheckoutValue} clickCntRef={clickCntRef} checkInValue={checkInValue} checkOutValue={checkOutValue} />
				<Day filter={filter} setFilter={setFilter} year={year} month={month} day={++day} lastDay={lastDay} key={`${year}-${month}-${day}`} setCheckInValue={setCheckInValue} setCheckoutValue={setCheckoutValue} clickCntRef={clickCntRef} checkInValue={checkInValue} checkOutValue={checkOutValue} />
				<Day filter={filter} setFilter={setFilter} year={year} month={month} day={++day} lastDay={lastDay} key={`${year}-${month}-${day}`} setCheckInValue={setCheckInValue} setCheckoutValue={setCheckoutValue} clickCntRef={clickCntRef} checkInValue={checkInValue} checkOutValue={checkOutValue} />
			</Week>,
		]);
		weekDayTitleList.push(<StyleDay key={i}>{weekTitleList[i]}</StyleDay>);
	}
	return (
		<StyleCalendar>
			<HeaderWrapper>
				{year}년 {month + 1}월
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
`;
