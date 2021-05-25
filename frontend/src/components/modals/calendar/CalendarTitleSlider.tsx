import styled from "styled-components";
import CalendarTitle from "./CalendarTitle";

export interface Props {}

export default function CalendarTitleSlider(props: Props) {
	// n년 n월 , n년 n+1월

	return (
		<StyleTitleSlider>
			<CalendarTitle year={2021} month={3} />
			<CalendarTitle year={2021} month={4} />
			<CalendarTitle year={2021} month={5} />
			<CalendarTitle year={2021} month={6} />
			<CalendarTitle year={2021} month={7} />
			<CalendarTitle year={2021} month={8} />
		</StyleTitleSlider>
	);
}

const StyleTitleSlider = styled.div`
	display: flex;
	position: absolute;
	width: 120vw;
	left: -85%;
	justify-content: space-around;
`;
