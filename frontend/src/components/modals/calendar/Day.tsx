import styled from "styled-components";
interface Props {
	year: number;
	month: number;
	day: number;
	lastDay: number;
	setInplaceHolder: React.Dispatch<React.SetStateAction<string | undefined>>;
}
export default function Day({ year, month, day, lastDay, setInplaceHolder }: Props) {
	const handleOnClick = () => {
		console.log(`${year}년 ${month}월 ${day}일 클릭.`);
		setInplaceHolder(`${year}년 ${month}월 ${day}일`);
	};

	const date = new Date(year, month, day);
	const today = new Date();
	const now = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
	if (day > lastDay || day <= 0) return <OldStyleTd></OldStyleTd>;
	if (date < now) return <OldStyleTd className="disable">{day}</OldStyleTd>;
	return <StyleTd onClick={handleOnClick}>{day}</StyleTd>;
}

const StyleTd = styled.td`
	width: 48px;
	height: 48px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 30px;
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
