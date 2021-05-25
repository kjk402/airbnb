import styled from "styled-components";

export interface Props {
	year: number;
	month: number;
}

export default function CalendarTitle({ year, month }: Props) {
	return (
		<StyleTitle>
			{year}년 {month}월
		</StyleTitle>
	);
}

const StyleTitle = styled.div`
	overflow: hidden;
`;
