import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import ModalContainer from "../../../styles/ModalContainer";
import { ModalInterface } from "../../../utils/interfaces";
import { getURL, Urls } from "./../../../utils/url";

function FeeModal({ filter, setFilter, type, setInplaceHolder, isActive, setModalOn }: ModalInterface) {
	const [data, setData] = useState([]);
	const [avgPrice, setAvgPrice] = useState();
	const MIN = `0`;
	const MAX = "100000";
	const [leftSliderValue, setLeftSliderValue] = useState(MIN);
	const [rightSliderValue, setRightSliderValue] = useState("100000");

	const fetchData = async () => {
		const url = getURL("price", filter.checkIn, filter.checkOut, filter.city);
		try {
			const res = await fetch(url);
			const json = await res.json();
			setAvgPrice(json.averagePrice);
			setData(json.allPrices);
		} catch (error) {
			console.error(error);
		}
	};
	const priceList = data.map((price) => price + "");
	const optionList = priceList.map((price, idx) => <option key={idx} value={price}></option>);

	const handleOutClick = () => {
		setModalOn(false);
		window.removeEventListener("click", handleOutClick);
	};

	useEffect(() => {
		fetchData();
		window.addEventListener("click", handleOutClick);
	}, []);

	const handleOnclick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	const changeL = (e: React.FormEvent<HTMLInputElement>) => {
		const numLeft = Number(e.currentTarget.value);
		const numRight = Number(rightSliderValue);
		setLeftSliderValue(`${Math.min(numLeft, numRight)}`);
		setInplaceHolder(`${leftSliderValue}-${rightSliderValue}`);
		const newSearchFilter = { minPrice: leftSliderValue };
		Object.assign(filter, newSearchFilter);
		setFilter(filter);
	};
	const changeR = (e: React.FormEvent<HTMLInputElement>) => {
		const numLeft = Number(leftSliderValue);
		const numRight = Number(e.currentTarget.value);
		setRightSliderValue(`${Math.max(numLeft, numRight)}`);
		setInplaceHolder(`${leftSliderValue}-${rightSliderValue}`);
		const newSearchFilter = { maxPrice: rightSliderValue };
		Object.assign(filter, newSearchFilter);
		setFilter(filter);
	};
	return (
		<>
			{isActive && (
				<ModalContainer type={type} onClick={(e) => handleOnclick(e)}>
					<ContentWrapper>
						<Title>가격 범위</Title>

						<PriceRange>
							￦{leftSliderValue} - ￦{rightSliderValue === "100000" ? rightSliderValue + "+" : rightSliderValue}
						</PriceRange>
						<PriceAvg>평균 1박 요금은 ￦{avgPrice} 입니다.</PriceAvg>

						<StyleGraph>
							<svg width="365" height="100"></svg>
							<RangeSlider>
								<input type="range" min={MIN} max={MAX} value={leftSliderValue} onInput={changeL} className="left" list={`${priceList}`} />
								<input type="range" min={MIN} max={MAX} value={rightSliderValue} onInput={changeR} className="right" list={`${priceList}`} />
								<datalist id={`${priceList}`}>{optionList};</datalist>
							</RangeSlider>
						</StyleGraph>
					</ContentWrapper>
				</ModalContainer>
			)}
		</>
	);
}

const FeeModalMemo = React.memo(FeeModal);
export default FeeModalMemo;

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
	position: relative;
	width: 365px;
	height: 100px;
	border: 1px solid red;
	margin: 30px 0;
`;

const RangeSlider = styled.div`
	position: relative;
	input[type="range"] {
		position: absolute;
		pointer-events: none;
		top: 0px;
		z-index: 2;
		height: 10px;
		width: 100%;
		cursor: pointer;
		-webkit-appearance: none;
		background: transparent;
		outline: none;
	}

	input[type="range"]::-webkit-slider-thumb {
		background: url("/pause-circle.png") no-repeat;
		background-position: center center;
		width: 20px;
		height: 20px;
		pointer-events: all;
		border-radius: 50%;
		-webkit-appearance: none;
	}
`;
