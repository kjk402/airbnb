import React, { useEffect } from "react";
import styled from "styled-components";
import ModalContainer from "../../../styles/ModalContainer";
import CalendarContainer from "./CalendarContainer";

interface ICalendar {
	type: string;
	setInplaceHolder: React.Dispatch<React.SetStateAction<string | undefined>>;
	className?: string;
	isActive?: boolean;
	setModalOn: any;
}

export default function CalendarModal({ type, isActive, setModalOn }: ICalendar) {
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
						<CalendarContainer />
					</ContentWrapper>
				</ModalContainer>
			)}
		</>
	);
}

const ContentWrapper = styled.div`
	display: flex;
	justify-content: center;
	width: 800px; /* 나중에 슬라이더를 이만큼 이동시키자. */
	height: 85%;
	border: 1px solid green;
	/* overflow: hidden; */
`;
