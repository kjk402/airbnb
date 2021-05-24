import SearchBar from "./../search_bar/SearchBar";
import styled from "styled-components";

export default function Main({}) {
	return (
		<StyleMain>
			<SearchBar />
		</StyleMain>
	);
}

const StyleMain = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
