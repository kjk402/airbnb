import { useState, useEffect, useRef, SetStateAction } from "react";
import styled from "styled-components";
import { ReactComponent as Larrow } from "./../../../icons/chevron-left.svg";
import { ReactComponent as Rarrow } from "./../../../icons/chevron-right.svg";
import CalendarCon from "./CalendarCon";

export interface Props {}

export default function CalendarContainer(props: Props) {
	const now = new Date();
	const [dx, setDx] = useState([-2, -1, 0, 1, 2, 3]);
	const initialCalendars = [new Date(now.getFullYear(), now.getMonth() + dx[0]), new Date(now.getFullYear(), now.getMonth() + dx[1]), new Date(now.getFullYear(), now.getMonth() + dx[2]), new Date(now.getFullYear(), now.getMonth() + dx[3]), new Date(now.getFullYear(), now.getMonth() + dx[4]), new Date(now.getFullYear(), now.getMonth() + dx[5])];

	const [curPos, setCurPos] = useState(0);
	const [isLeftClicked, setIsLeftClicked] = useState(false);
	const [isRightClicked, setIsRightClicked] = useState(false);
	const [dateList, setDateList] = useState(initialCalendars);
	const handleLeftClick = () => {
		setIsLeftClicked(true);
		setCurPos(() => curPos + 800);
	};
	const handleRightClick = () => {
		setIsRightClicked(true);
		setCurPos(() => curPos - 800);
	};
	const handleSlideEnd = () => {
		if (isLeftClicked) {
			setIsLeftClicked(false);
			setDx(dx.map((el) => el - 2));
			setCurPos(() => curPos - 800);
		}
		if (isRightClicked) {
			setIsRightClicked(false);
			setDx(dx.map((el) => el + 2));
			setCurPos(() => curPos + 800);
		}
	};

	useEffect(() => {
		setDateList(dateList.map((date, i) => new Date(now.getFullYear(), now.getMonth() + dx[i])));
	}, [curPos]);
	const calendarList = dateList.map((calendar, idx) => <CalendarCon key={idx} data={calendar} />);

	return (
		<>
			<StyleContainer>
				<Slider className={isLeftClicked || isRightClicked ? "on-slide" : ""} curPos={curPos} onTransitionEnd={handleSlideEnd}>
					{calendarList}
				</Slider>
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
	/* border: 1px solid red; */
`;

const Slider = styled.div<{ curPos: number }>`
	height: 100%;
	display: flex;
	align-items: center;
	transform: ${(props) => `translateX(${props.curPos}px)`};
	&.on-slide {
		transition: all, 0.2s;
	}
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
