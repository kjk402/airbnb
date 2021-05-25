import styled from "styled-components";
import CalendarHeader from "./CalnedarHeader";
import CalendarBody from "./CalendarBody";

export interface Props {}

export default function CalendarContainer(props: Props) {
	// 여기서 달력 상태관리
	return (
		<StyleContainer>
			<CalendarHeader />
			<CalendarBody />
		</StyleContainer>
	);
}

const StyleContainer = styled.div`
	width: 85%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border: 1px solid red;
`;
