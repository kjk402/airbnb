import styled from "styled-components";
import Logo from "./Logo";
import SideContainer from "./side_menu/SideContainer";
import Tour from "./Tour";

export default function Header({}: {}) {
	return (
		<StyleHeader>
			<Logo />
			<Tour />
			<SideContainer />
		</StyleHeader>
	);
}

const StyleHeader = styled.div`
	display: grid;
	grid-template-columns: 1fr 3fr 1fr;
`;
