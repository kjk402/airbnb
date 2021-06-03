import styled from "styled-components";
import Logo from "./Logo";
import SideContainer from "./side_menu/SideContainer";
import Tour from "./Tour";
import { EmptyInterface } from "./../../../utils/interfaces";

export default function Header(props: EmptyInterface) {
	return (
		<StyleHeader>
			<Logo isMini={false} />
			<Tour />
			<SideContainer isMini={false} />
		</StyleHeader>
	);
}

const StyleHeader = styled.div`
	display: grid;
	grid-template-columns: 1fr 3fr 1fr;
`;
