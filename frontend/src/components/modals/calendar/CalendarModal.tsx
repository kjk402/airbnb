import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import ModalContainer from "../../../styles/ModalContainer";
import CalendarContainer from "./CalendarContainer";

interface ICalendar {
	type: string;
	checkInValue: string | undefined;
	checkOutValue: string | undefined;
	setCheckInValue: React.Dispatch<React.SetStateAction<string | undefined>>;
	setCheckoutValue: React.Dispatch<React.SetStateAction<string | undefined>>;
	className?: string;
	isActive?: boolean;
	setModalOn: any;
}

export default function CalendarModal({ type, isActive, setModalOn, setCheckInValue, setCheckoutValue, checkInValue, checkOutValue }: ICalendar) {
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

	return (
		<>
			{isActive && (
				<ModalContainer type={type} onClick={(e) => handleOnclick(e)}>
					<ContentWrapper>
						<CalendarContainer checkInValue={checkInValue} checkOutValue={checkOutValue} setCheckInValue={setCheckInValue} setCheckoutValue={setCheckoutValue} clickCntRef={clickCntRef} />
					</ContentWrapper>
				</ModalContainer>
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
