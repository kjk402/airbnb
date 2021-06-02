import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import SearchFilter from "./SearchFilter";

interface SearchBarProps {
	filter: any;
	setFilter: any;
	setFlag: any;
	// isCalendarModalOn?: boolean;
	// setIsCalendarModalOn?: any;
	// isFeeModalOn?: boolean;
	// setIsFeeModalOn?: any;
	// isGuestModalOn?: boolean;
	// setIsGuestModalOn?: any;
	// isLocationModalOn?: boolean;
	// setIsLocationModalOn?: any;
	// calendarToggleCheckInRef?: any;
	// calendarToggleCheckOutRef?: any;
}

export default function SearchBar({ filter, setFilter, setFlag }: SearchBarProps) {
	const [isLocationModalOn, setIsLocationModalOn] = useState<boolean>(false);
	const [isCalendarModalOn, setIsCalendarModalOn] = useState<boolean>(false);
	const [isFeeModalOn, setIsFeeModalOn] = useState<boolean>(false);
	const [isGuestModalOn, setIsGuestModalOn] = useState<boolean>(false);
	const calendarToggleCheckInRef = useRef(false);
	const calendarToggleCheckOutRef = useRef(false);

	useEffect(() => {
		console.log(filter);
	});
	return (
		<StyleSearchBar>
			<SearchFilter type="LOCATION" filter={filter} setFilter={setFilter} input="어디로 여행가세요?" isEnd={false} isLocationModalOn={isLocationModalOn} setIsLocationModalOn={setIsLocationModalOn} setFlag={setFlag} />
			<SearchFilter type="CHECKIN" filter={filter} setFilter={setFilter} isEnd={false} placeholder={"날짜 입력"} isCalendarModalOn={isCalendarModalOn} setIsCalendarModalOn={setIsCalendarModalOn} calendarToggleCheckInRef={calendarToggleCheckInRef} calendarToggleCheckOutRef={calendarToggleCheckOutRef} setFlag={setFlag} />
			<SearchFilter type="FEE" filter={filter} setFilter={setFilter} isEnd={false} placeholder={"금액대 설정"} isFeeModalOn={isFeeModalOn} setIsFeeModalOn={setIsFeeModalOn} setFlag={setFlag} />
			<SearchFilter type="GUEST" filter={filter} setFilter={setFilter} isEnd={true} placeholder={"게스트 추가"} isGuestModalOn={isGuestModalOn} setIsGuestModalOn={setIsGuestModalOn} setFlag={setFlag} />
		</StyleSearchBar>
	);
}

const StyleSearchBar = styled.div`
	display: flex;
	position: relative;
	align-items: center;
	width: 1016px;
	height: 76px;
	margin-top: 30px;
	border-radius: 60px;
	background-color: #ffffff;
`;
