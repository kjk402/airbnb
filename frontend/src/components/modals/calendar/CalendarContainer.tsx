import styled from "styled-components";
import { ReactComponent as Larrow } from "./../../../icons/chevron-left.svg";
import { ReactComponent as Rarrow } from "./../../../icons/chevron-right.svg";
import CalendarCon from "./CalendarCon";

export interface Props {}

export default function CalendarContainer(props: Props) {
	// 여기서 달력 상태관리
	const now = new Date();
	const dateList = [new Date(now.getFullYear(), now.getMonth() - 2), new Date(now.getFullYear(), now.getMonth() - 1), new Date(now.getFullYear(), now.getMonth()), new Date(now.getFullYear(), now.getMonth() + 1), new Date(now.getFullYear(), now.getMonth() + 2), new Date(now.getFullYear(), now.getMonth() + 3)];

	const calendarList = dateList.map((calendar, idx) => <CalendarCon key={idx} data={calendar} />);

	return (
		<>
			<LIcon>
				<Larrow />
			</LIcon>
			<StyleContainer>
				<Slider>{calendarList}</Slider>
			</StyleContainer>
			<RIcon>
				<Rarrow />
			</RIcon>
		</>
	);
}

const StyleContainer = styled.div`
	border: 1px solid red;
`;

const Slider = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
	transform: translateX(0px);
`;

const LIcon = styled.button`
	position: absolute;
	background-color: transparent;
	left: 150px;
	top: 80px;
	:hover {
		cursor: pointer;
	}
`;

const RIcon = styled.button`
	position: absolute;
	background-color: transparent;
	left: 830px;
	top: 80px;
	:hover {
		cursor: pointer;
	}
`;
