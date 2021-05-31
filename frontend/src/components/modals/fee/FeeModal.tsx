import { useEffect } from "react";
import styled from "styled-components";
import ModalContainer from "../../../styles/ModalContainer";
import { ModalInterface } from "../../../utils/interfaces";

export default function FeeModal({ type, setInplaceHolder, isActive, setModalOn }: ModalInterface) {
	const handleOutClick = () => {
		setModalOn(false);
		window.removeEventListener("click", handleOutClick);
	};

	useEffect(() => {
		window.addEventListener("click", handleOutClick);
	}, []);

	const handleOnclick = (e: any) => {
		e.stopPropagation();
	};
	return (
		<>
			{isActive && (
				<ModalContainer type={type} onClick={(e) => handleOnclick(e)}>
					<ContentWrapper>
						<Title>가격 범위</Title>

						<PriceRange>100,000 - 1,000,000+</PriceRange>
						<PriceAvg>평균 1박 요금은 165,556 입니다.</PriceAvg>

						<StyleGraph>그래프</StyleGraph>
					</ContentWrapper>
				</ModalContainer>
			)}
		</>
	);
}

const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 75%;
	height: 80%;
`;

const Title = styled.div`
	padding: 20px 0;
`;

const PriceRange = styled.div`
	font-size: 18px;
`;

const PriceAvg = styled.div`
	color: #828282;
	line-height: 40px;
`;

const StyleGraph = styled.div`
	width: 365px;
	height: 100px;
	border: 1px solid red;
	margin: 30px 0;
`;
