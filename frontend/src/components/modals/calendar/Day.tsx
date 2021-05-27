import { useState } from "react";
import styled from "styled-components";
import parseDate from "./../../../utils/parseDate";
interface Props {
	year: number;
	month: number;
	day: number;
	lastDay: number;
	setCheckInValue: React.Dispatch<React.SetStateAction<string | undefined>>;
	setCheckoutValue: React.Dispatch<React.SetStateAction<string | undefined>>;
	checkInValue: string | undefined;
	checkOutValue: string | undefined;
	clickCntRef: React.MutableRefObject<number>;
}
export default function Day({ year, month, day, lastDay, setCheckInValue, setCheckoutValue, clickCntRef, checkInValue, checkOutValue }: Props) {
	const [selected, setSelected] = useState(false);
	const date = new Date(year, month, day);
	const today = new Date();
	const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());

	const handleOnClick = () => {
		console.log(`${year}년 ${month + 1}월 ${day}일 클릭.`);
		setSelected(!selected);
		clickCntRef.current = clickCntRef.current + 1;
		console.log(`방금 클릭한 날짜: ${year}년 ${month + 1}월 ${day}일`);
		const dateSelected = new Date(year, month, day);

		if (clickCntRef.current === 1) setCheckInValue(`${year}년 ${month + 1}월 ${day}일`);
		else {
			if (dateSelected >= parseDate(checkInValue)) setCheckoutValue(`${year}년 ${month + 1}월 ${day}일`);
			else {
				setCheckoutValue(checkInValue);
				setCheckInValue(`${year}년 ${month + 1}월 ${day}일`);
			}
		}
	};

	if (day > lastDay || day <= 0) return <OldStyleTd></OldStyleTd>;
	if (date < now) return <OldStyleTd className="disable">{day}</OldStyleTd>;
	return (
		<StyleTd onClick={handleOnClick} selected={selected}>
			{day}
		</StyleTd>
	);
}

const StyleTd = styled.td<{ selected: boolean }>`
	width: 48px;
	height: 48px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 30px;
	background-color: ${(props) => (props.selected ? "#333333" : "#FFFFFF")};
	color: ${(props) => (props.selected ? "#FFFFFF" : "#333333")};
	:hover {
		border: 1px solid #b8b8b8;
		cursor: pointer;
	}
`;

const OldStyleTd = styled.td`
	width: 48px;
	height: 48px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 30px;
	color: #e4e4e4;
	&.disable {
		:hover {
			cursor: not-allowed;
		}
	}
`;
