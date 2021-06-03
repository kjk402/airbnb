import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { parseURL } from "./../../utils/parseURL";
import Logo from "./../../components/main/header/Logo";
import Tour from "./../../components/main/header/Tour";
import SideContainer from "./../../components/main/header/side_menu/SideContainer";
import SearchBar from "./../search_bar/SearchBar";
import { FilterProps } from "./../../App";
import { getFilter } from "./../../utils/getFilter";
import MiniSearchBar from "./MiniSearchBar";

export default function SearchResult() {
	const URL = parseURL(window.location.href);
	const filterData = getFilter(window.location.href);
	const { checkIn, checkOut, minPrice, maxPrice, numOfPeople }: FilterProps = filterData;
	const [data, setData] = useState();
	const [filter, setFilter] = useState<FilterProps>({ city: undefined, checkIn: checkIn, checkOut: checkOut, minPrice: minPrice, maxPrice: maxPrice, numOfPeople: numOfPeople });
	const [isMini, setIsMini] = useState(true);

	const fetchData = async () => {
		try {
			const res = await fetch(URL);
			const json = await res.json();
			setData(json);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchData();
		window.addEventListener("click", handleOutClick);
	}, []);

	const handleSearchBar = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsMini(false);
	};

	const handleOutClick = () => {
		setIsMini(true);
		window.removeEventListener("click", handleOutClick);
	};

	return (
		<BodyWrapper>
			<StyleHeader>
				<Logo />
				{isMini ? (
					<div onClick={(e) => handleSearchBar(e)}>
						{" "}
						<MiniSearchBar />
					</div>
				) : (
					<Tour />
				)}
				<SideContainer />
			</StyleHeader>
			<SearchBarArea>{!isMini && <SearchBar filter={filter} setFilter={setFilter} setFlag={true} isResultPage={true} isMini={false} />}</SearchBarArea>
			<StyleMain>
				{data ? (
					<MainWrapper>
						<StyleRooms>검색결과</StyleRooms>
						<StyleMap>지도</StyleMap>
					</MainWrapper>
				) : (
					<>loading</>
				)}
			</StyleMain>
		</BodyWrapper>
	);
}

const BodyWrapper = styled.div`
	margin: 10px 10px;
`;
const StyleHeader = styled.div`
	display: grid;
	grid-template-columns: 1fr 5fr 1fr;
	align-items: center;
`;

const StyleMain = styled.div``;

const SearchBarArea = styled.div``;

const MainWrapper = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
`;

const StyleRooms = styled.div``;

const StyleMap = styled.div``;
