import { useState } from "react";
import styled from "styled-components";
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
	const now = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

	const handleOnClick = () => {
		console.log(`${year}년 ${month}월 ${day}일 클릭.`);
		setSelected(!selected);
		if (clickCntRef.current < 2) {
			clickCntRef.current = clickCntRef.current + 1;
			if (clickCntRef.current === 1) setCheckInValue(`${year}년 ${month}월 ${day}일`);
			if (clickCntRef.current === 2) {
				const clickedDate = new Date(year, month - 1, day);
				console.log(clickedDate);
				console.log(checkInValue);
				setCheckoutValue(`${year}년 ${month}월 ${day}일`);
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
