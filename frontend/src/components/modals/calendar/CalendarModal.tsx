import React, { useEffect } from "react";
import styled from "styled-components";
import ModalContainer from "../../../styles/ModalContainer";
import { ModalInterface } from "../../../utils/interfaces";
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
	width: 100%;
`;
