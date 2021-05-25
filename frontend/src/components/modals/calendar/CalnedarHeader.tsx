import styled from "styled-components";
import CalendarTitleSlider from "./CalendarTitleSlider";
import { ReactComponent as Larrow } from "./../../../icons/chevron-left.svg";
import { ReactComponent as Rarrow } from "./../../../icons/chevron-right.svg";
export interface Props {}

export default function CalendarHeader(props: Props) {
	//  화살표 , titleSlider, 화살표를 자식으로 받음
	return (
		<StyleHeader>
			<StyleArrow>
				<Larrow />
			</StyleArrow>
			<CalendarTitleSlider />
			<StyleArrow>
				<Rarrow />
			</StyleArrow>
		</StyleHeader>
	);
}

const StyleHeader = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
	overflow: hidden;
`;

const StyleArrow = styled.button`
	background-color: transparent;
	z-index: 1;
	:hover {
		cursor: pointer;
	}
`;
