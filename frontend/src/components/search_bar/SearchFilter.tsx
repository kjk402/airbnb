import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "./../../icons/search.svg";
import parseByType from "../../utils/parseByType";
import CalendarModal from "../modals/calendar/CalendarModal";
import FeeModalMemo from "../modals/fee/FeeModal";
import GuestModal from "../modals/guest/GuestModal";
import { Link } from "react-router-dom";
import { urlState } from "./../../atoms";

interface SearchFilterInterface {
	type: string;
	isEnd: boolean;
	input?: string;
	filter: any;
	setFilter: any;
	setFlag: any;
	placeholder?: string | undefined;
	isCalendarModalOn?: boolean;
	setIsCalendarModalOn?: any;
	isFeeModalOn?: boolean;
	setIsFeeModalOn?: any;
	isGuestModalOn?: boolean;
	setIsGuestModalOn?: any;
	isLocationModalOn?: boolean;
	setIsLocationModalOn?: any;
	calendarToggleCheckInRef?: any;
	calendarToggleCheckOutRef?: any;
}

export default function SearchFilter({ setFlag, filter, setFilter, type, input, isEnd, placeholder, isCalendarModalOn, setIsCalendarModalOn, isFeeModalOn, setIsFeeModalOn, isGuestModalOn, setIsGuestModalOn, isLocationModalOn, setIsLocationModalOn, calendarToggleCheckInRef, calendarToggleCheckOutRef }: SearchFilterInterface) {
	const [inplaceHolder, setInplaceHolder] = useState(placeholder);
	const [checkOutValue, setCheckoutValue] = useState(placeholder);
	const [url, setUrlState] = useRecoilState(urlState);

	const handleSearchClick = (e: React.MouseEvent): void => {
		e.stopPropagation();
		setUrlState(`${filter.city}${filter.checkIn}${filter.checkOut}${filter.minPrice}${filter.maxPrice}${filter.numOfPeople}`);
	};

	const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
		const newSearchFilter = { city: e.currentTarget.value };
		Object.assign(filter, newSearchFilter);
		setFilter(filter);
	};

	const handleOnClick = (e: React.MouseEvent, type: string): void => {
		if (type === "LOCATION") setIsLocationModalOn((isLocationModalOn: boolean) => !isLocationModalOn);
		if (type === "FEE") setIsFeeModalOn((isFeeModalOn: boolean) => !isFeeModalOn);
		if (type === "GUEST") setIsGuestModalOn((isGuestModalOn: boolean) => !isGuestModalOn);
		if (type === "CHECKIN" || type === "CHECKOUT") setIsCalendarModalOn((isCalendarModalOn: boolean) => !isCalendarModalOn);
	};
	return (
		<SearchFilterWrapper onClick={(e) => handleOnClick(e, type)}>
			<StyleFilter type={type}>
				<SearchWrapper isEnd={isEnd}>
					{type === "CHECKIN" ? (
						<CheckInWrapper>
							<CheckIn>
								<div>체크인</div>
								<div>{placeholder && <div>{inplaceHolder}</div>}</div>
							</CheckIn>
							<CheckOut>
								<div>체크아웃</div>
								<div>{placeholder && <div>{checkOutValue}</div>}</div>
							</CheckOut>
						</CheckInWrapper>
					) : (
						<>
							{parseByType("title", type)}
							{input && <SearchLocationStyle onInput={handleInput} placeholder={input} />}
							{placeholder && <div>{inplaceHolder}</div>}{" "}
						</>
					)}
				</SearchWrapper>
			</StyleFilter>
			{isEnd && (
				<Link to={{ pathname: `/rooms/search?checkIn=${filter.checkIn}&checkOut=${filter.checkOut}&cityName=${filter.city}&maxPrice=${filter.maxPrice}&minPrice=${filter.minPrice}&numOfPeople=${filter.numOfPeople}` }}>
					<StyleSearchBtn onClick={(e) => handleSearchClick(e)}>
						<SearchIcon stroke="#FFFFFF" width="24" height="24" />
					</StyleSearchBtn>
				</Link>
			)}

			{isCalendarModalOn && <CalendarModal className="calendar-modal" filter={filter} setFilter={setFilter} type={type} setCheckInValue={setInplaceHolder} setCheckoutValue={setCheckoutValue} isActive={isCalendarModalOn} setModalOn={setIsCalendarModalOn} checkInValue={inplaceHolder} checkOutValue={checkOutValue} />}
			{isFeeModalOn && <FeeModalMemo type={type} className="fee-modal" filter={filter} setFilter={setFilter} setInplaceHolder={setInplaceHolder} isActive={isFeeModalOn} setModalOn={setIsFeeModalOn} />}
			{isGuestModalOn && <GuestModal type={type} className="guest-modal" filter={filter} setFilter={setFilter} setInplaceHolder={setInplaceHolder} isActive={isGuestModalOn} setModalOn={setIsGuestModalOn} />}
		</SearchFilterWrapper>
	);
}

const SearchFilterWrapper = styled.div`
	position: relative;
	display: flex;
	height: 100%;
	align-items: center;
`;

const StyleFilter = styled.div<{ type: string }>`
	font-family: "Noto Sans KR", sans-serif;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	width: ${(props) => (props.type === "CHECKIN" ? "410px" : "205px")};
	height: 100%;
	border-radius: 60px;
	background-color: #ffffff;
	:hover {
		background-color: #e0e0e0;
		cursor: pointer;
	}
`;

const SearchWrapper = styled.div<{ isEnd: boolean }>`
	width: 90%;
	height: 44px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-around;
	border-right: ${(props) => (props.isEnd ? "none" : "1px solid #E0E0E0")};
	margin-left: 20px;
`;

const CheckInWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const CheckIn = styled.div`
	display: flex;
	height: 44px;
	flex-direction: column;
	justify-content: space-around;
`;

const CheckOut = styled.div`
	display: flex;
	height: 44px;
	flex-direction: column;
	justify-content: space-around;
	margin-right: 100px;
`;
const SearchLocationStyle = styled.input`
	border: none;
`;

const StyleSearchBtn = styled.button`
	position: relative;
	left: -65px;
	width: 50px;
	height: 50px;
	background-color: #e84c60;
	border-radius: 50%;
	transition: background-color 0.5s;
	:hover {
		background-color: #d12038;
	}
`;
