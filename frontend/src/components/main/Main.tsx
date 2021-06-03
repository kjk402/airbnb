import styled from "styled-components";
import SearchBar from "./../search_bar/SearchBar";

interface MainProps {
	filter: any;
	setFilter: any;
	setFlag: any;
}

export default function Main({ filter, setFilter, setFlag }: MainProps) {
	return (
		<StyleMain>
			<SearchBar filter={filter} setFilter={setFilter} setFlag={setFlag} isResultPage={false} isMini={false} />
		</StyleMain>
	);
}

const StyleMain = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
