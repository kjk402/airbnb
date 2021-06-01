import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import ModalContainer from "../../../styles/ModalContainer";
import CalendarContainer from "./CalendarContainer";
import { ReactComponent as XCircle } from "./../../../icons/x-circle.svg";

interface ICalendar {
	type: string;
	checkInValue: string | undefined;
	checkOutValue: string | undefined;
	filter: any;
	setFilter: any;
	setCheckInValue: React.Dispatch<React.SetStateAction<string | undefined>>;
	setCheckoutValue: React.Dispatch<React.SetStateAction<string | undefined>>;
	className?: string;
	isActive?: boolean;
	setModalOn: any;
}

export default function CalendarModal({ filter, setFilter, type, isActive, setModalOn, setCheckInValue, setCheckoutValue, checkInValue, checkOutValue }: ICalendar) {
	const clickCntRef = useRef(0);
	const handleOutClick = () => {
		setModalOn(false);
		window.removeEventListener("click", handleOutClick);
	};

	useEffect(() => {
		window.addEventListener("click", handleOutClick);
	}, []);

	const handleOnclick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	const cleanUpDate = (e: React.MouseEvent) => {
		e.stopPropagation();
		clickCntRef.current = 0;
		setCheckInValue("날짜 입력");
		setCheckoutValue("날짜 입력");
	};

	return (
		<>
			{isActive && (
				<ModalContainer type={type} onClick={(e) => handleOnclick(e)}>
					<ContentWrapper>
						<CalendarContainer filter={filter} setFilter={setFilter} checkInValue={checkInValue} checkOutValue={checkOutValue} setCheckInValue={setCheckInValue} setCheckoutValue={setCheckoutValue} clickCntRef={clickCntRef} />
					</ContentWrapper>
				</ModalContainer>
			)}
			{isActive || clickCntRef.current !== 0 ? (
				<XCircleWrapper onClick={cleanUpDate}>
					<XCircle className="x-circle" />
				</XCircleWrapper>
			) : (
				<></>
			)}
		</>
	);
}

const ContentWrapper = styled.div`
	display: flex;
	justify-content: center;
	width: 800px;
	height: 85%;
	overflow: hidden;
`;

const XCircleWrapper = styled.button`
	position: absolute;
	left: 325px;
	background: none;
	z-index: 1;
	* {
		:hover {
			fill: "#e4e4e4";
		}
	}
`;
