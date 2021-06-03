import React from "react";
import styled from "styled-components";

export interface IAppProps {
	info: any;
	setIsModalOn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BookModal({ info, setIsModalOn }: IAppProps) {
	const handleBgClick = () => {
		console.log("bg clicked");
	};
	const handleModalClick = () => {
		console.log("modal clicked");
	};

	return (
		<>
			<Bg onClick={handleBgClick}></Bg>
			<Modal onClick={handleModalClick}></Modal>
		</>
	);
}

const Bg = styled.div`
	position: absolute;
	z-index: 100;
	width: 1440px;
	height: 1440px;
	background-color: #0e0e0e;
	opacity: 0.33;
`;

const Modal = styled.div`
	z-index: 101;
	width: 400px;
	height: 542px;
	background-color: #ffffff;
`;
