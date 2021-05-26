import styled from "styled-components";
import { ReactComponent as Larrow } from "./../../../icons/chevron-left.svg";
import { ReactComponent as Rarrow } from "./../../../icons/chevron-right.svg";
import CalendarCon from "./CalendarCon";

export interface Props {}

export default function CalendarContainer(props: Props) {
	// 여기서 달력 상태관리
	const slide = [-2, -1, 0, 1, 2, 3];

	return (
		<>
			<LIcon>
				<Larrow />
			</LIcon>
			<StyleContainer>
				<Slider>
					<CalendarCon month={slide[0]} />
					<CalendarCon month={slide[1]} />
					<CalendarCon month={slide[2]} />
					<CalendarCon month={slide[3]} />
					<CalendarCon month={slide[4]} />
					<CalendarCon month={slide[5]} />
				</Slider>
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
