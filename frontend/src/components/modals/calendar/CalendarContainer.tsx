import {useState, useEffect, useRef} from 'react';
import styled from "styled-components";
import { ReactComponent as Larrow } from "./../../../icons/chevron-left.svg";
import { ReactComponent as Rarrow } from "./../../../icons/chevron-right.svg";
import CalendarCon from "./CalendarCon";

export interface Props {}

export default function CalendarContainer(props: Props) {
	// 여기서 달력 상태관리
	const [dx, setDx] = useState([-2, -1, 0, 1, 2, 3]);
	const [isLeftClicked, setIsLeftClicked] = useState(false);
	const [isRightClicked, setIsRightClicked] = useState(false);
	// const calendarMoveCnt = useRef(0);
	const CALENDAR_COUNT = 6;
	const now = new Date();
	const dateList = [];
	useEffect (() => {
		isLeftClicked && setDx(()=>dx.map((el)=>el-2));
		isRightClicked && setDx(()=>dx.map((el)=>el+2));
		setIsLeftClicked(false);
		setIsRightClicked(false);
	},[]);

	for(let i = 0; i < CALENDAR_COUNT; i++) dateList.push(new Date(now.getFullYear(), now.getMonth() + dx[i]));
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
