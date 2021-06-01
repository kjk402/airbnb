import React, { useState, useRef } from "react";
import styled from "styled-components";
import SearchFilter from "./SearchFilter";
import { EmptyInterface } from "./../../utils/interfaces";

interface FilterProps {
	city?: string | undefined;
	checkIn?: string | undefined;
	checkOut?: string | undefined;
	minPrice?: string | undefined;
	maxPrice?: string | undefined;
	numOfPeople?: string | undefined;
}

export default function SearchBar(props: EmptyInterface) {
	const [isLocationModalOn, setIsLocationModalOn] = useState<boolean>(false);
	const [isCalendarModalOn, setIsCalendarModalOn] = useState<boolean>(false);
	const [isFeeModalOn, setIsFeeModalOn] = useState<boolean>(false);
	const [isGuestModalOn, setIsGuestModalOn] = useState<boolean>(false);
	const [filter, setFilter] = useState<FilterProps>({ city: undefined, checkIn: undefined, checkOut: undefined, minPrice: undefined, maxPrice: undefined, numOfPeople: undefined });
	const calendarToggleCheckInRef = useRef(false);
	const calendarToggleCheckOutRef = useRef(false);
	const handleOnclick = (e: React.MouseEvent): void => {};
	console.log(filter);
	return (
		<StyleSearchBar onClick={handleOnclick}>
			<SearchFilter type="LOCATION" filter={filter} setFilter={setFilter} input="어디로 여행가세요?" isEnd={false} isLocationModalOn={isLocationModalOn} setIsLocationModalOn={setIsLocationModalOn} />
			<SearchFilter type="CHECKIN" filter={filter} setFilter={setFilter} isEnd={false} placeholder={"날짜 입력"} isCalendarModalOn={isCalendarModalOn} setIsCalendarModalOn={setIsCalendarModalOn} calendarToggleCheckInRef={calendarToggleCheckInRef} calendarToggleCheckOutRef={calendarToggleCheckOutRef} />
			<SearchFilter type="FEE" filter={filter} setFilter={setFilter} isEnd={false} placeholder={"금액대 설정"} isFeeModalOn={isFeeModalOn} setIsFeeModalOn={setIsFeeModalOn} />
			<SearchFilter type="GUEST" filter={filter} setFilter={setFilter} isEnd={true} placeholder={"게스트 추가"} isGuestModalOn={isGuestModalOn} setIsGuestModalOn={setIsGuestModalOn} />
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
