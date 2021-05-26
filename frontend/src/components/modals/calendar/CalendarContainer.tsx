import {useState, useEffect, useRef} from 'react';
import styled from "styled-components";
import { ReactComponent as Larrow } from "./../../../icons/chevron-left.svg";
import { ReactComponent as Rarrow } from "./../../../icons/chevron-right.svg";
import CalendarCon from "./CalendarCon";

export interface Props {}

export default function CalendarContainer(props: Props) {
	// 여기서 달력 상태관리
	const [dx, setDx] = useState([-2, -1, 0, 1, 2, 3]);
	const [curPos, setCurPos] = useState(0);
	const [isLeftClicked, setIsLeftClicked] = useState(false);
	const [isRightClicked, setIsRightClicked] = useState(false);
	// const calendarMoveCnt = useRef(0);
	const CALENDAR_COUNT = 6;
	const now = new Date();
	let dateList = useRef<Date[]>([]);

	const handleLeftClick = () => {
		setCurPos(()=>curPos+800);
		setIsLeftClicked(true);
	}
	const handleRightClick = () => {
		setCurPos(()=>curPos-800);
		setIsRightClicked(true);
	}
	const handleSlideEnd = () => {	
		console.log('transition ended');
		if(isLeftClicked) {
			setIsLeftClicked(false);
		}
		if(isRightClicked) {
			setIsRightClicked(false);
		}
	}
	for(let i = 0; i < CALENDAR_COUNT; i++) dateList.current.push(new Date(now.getFullYear(), now.getMonth() + dx[i]));
	const calendarList = dateList.current.map((calendar, idx) => <CalendarCon key={idx} data={calendar} />);

	return (
		<>
			<StyleContainer>
				<Slider curPos={curPos} onTransitionEnd={handleSlideEnd}>{calendarList}</Slider>
			</StyleContainer>
			<LIcon onClick={handleLeftClick}>
				<Larrow />
			</LIcon>
			<RIcon onClick={handleRightClick}>
				<Rarrow />
			</RIcon>
		</>
	);
}

const StyleContainer = styled.div`
	border: 1px solid red;
`;

const Slider = styled.div<{ curPos: number }>`
	height: 100%;
	display: flex;
	align-items: center;
	transform: ${(props) => `translateX(${props.curPos}px)`};
	transition: transform, 0.2s;
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
