import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as Larrow } from "./../../../icons/chevron-left.svg";
import { ReactComponent as Rarrow } from "./../../../icons/chevron-right.svg";
import CalendarCon from "./CalendarCon";

export interface Props {
	setCheckInValue: React.Dispatch<React.SetStateAction<string | undefined>>;
	setCheckoutValue: React.Dispatch<React.SetStateAction<string | undefined>>;
	checkInValue: string | undefined;
	checkOutValue: string | undefined;
	clickCntRef: React.MutableRefObject<number>;
	filter: Object;
	setFilter: any;
}

export default function CalendarContainer({ filter, setFilter, setCheckInValue, setCheckoutValue, clickCntRef, checkInValue, checkOutValue }: Props) {
	const CALENDAR_WIDTH = 800;
	const now = new Date();
	const [dx, setDx] = useState([-2, -1, 0, 1, 2, 3]);
	const initialCalendars = [new Date(now.getFullYear(), now.getMonth() + dx[0]), new Date(now.getFullYear(), now.getMonth() + dx[1]), new Date(now.getFullYear(), now.getMonth() + dx[2]), new Date(now.getFullYear(), now.getMonth() + dx[3]), new Date(now.getFullYear(), now.getMonth() + dx[4]), new Date(now.getFullYear(), now.getMonth() + dx[5])];

	const [curPos, setCurPos] = useState(0);
	const [isLeftClicked, setIsLeftClicked] = useState(false);
	const [isRightClicked, setIsRightClicked] = useState(false);
	const [dateList, setDateList] = useState(initialCalendars);
	const handleLeftClick = () => {
		setIsLeftClicked(true);
		setCurPos(() => curPos + CALENDAR_WIDTH);
	};
	const handleRightClick = () => {
		setIsRightClicked(true);
		setCurPos(() => curPos - CALENDAR_WIDTH);
	};
	const handleSlideEnd = () => {
		if (isLeftClicked) {
			setIsLeftClicked(false);
			setDx(dx.map((el) => el - 2));
			setCurPos(() => curPos - CALENDAR_WIDTH);
		}
		if (isRightClicked) {
			setIsRightClicked(false);
			setDx(dx.map((el) => el + 2));
			setCurPos(() => curPos + CALENDAR_WIDTH);
		}
	};

	useEffect(() => {
		setDateList(dateList.map((date, i) => new Date(now.getFullYear(), now.getMonth() + dx[i])));
	}, [dx]);
	const calendarList = dateList.map((calendar, idx) => <CalendarCon filter={filter} setFilter={setFilter} checkInValue={checkInValue} checkOutValue={checkOutValue} clickCntRef={clickCntRef} key={idx} data={calendar} setCheckInValue={setCheckInValue} setCheckoutValue={setCheckoutValue} />);

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

const StyleContainer = styled.div``;

const Slider = styled.div<{ curPos: number }>`
	height: 100%;
	display: flex;
	align-items: center;
	transform: ${(props) => `translateX(${props.curPos}px)`};
	&.on-slide {
		transition: transform, 0.2s;
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
