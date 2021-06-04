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
import Rooms from "./Rooms";
import { MapMemo } from "./Map";
import { useRecoilState } from "recoil";
import { bookModalState, cardInfoState } from "./../../atoms";
import BookContent from "./BookContent";

export default function SearchResult() {
	const URL = parseURL(window.location.href);
	const filterData = getFilter(window.location.href);
	const { checkIn, checkOut, minPrice, maxPrice, numOfPeople }: FilterProps = filterData;
	const [data, setData] = useState([]);
	const [filter, setFilter] = useState<FilterProps>({ city: undefined, checkIn: checkIn, checkOut: checkOut, minPrice: minPrice, maxPrice: maxPrice, numOfPeople: numOfPeople });
	const [isMini, setIsMini] = useState(true);
	const [isModalOn, setIsModalOn] = useRecoilState(bookModalState);
	const [cardInfo] = useRecoilState(cardInfoState);

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
	}, []);

	useEffect(() => {
		window.addEventListener("click", handleOutClick);
	}, [isMini]);

	const handleSearchBar = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsMini(false);
	};

	const handleOutClick = () => {
		setIsMini(true);
		window.removeEventListener("click", handleOutClick);
	};

	const handleModalClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	const handleBgClick = () => {
		setIsModalOn(false);
	};

	return (
		<>
			<StyleHeader>
				<Logo />
				{isMini ? (
					<div onClick={(e) => handleSearchBar(e)}>
						{" "}
						<MiniSearchBar filter={filter} />
					</div>
				) : (
					<NewHeaderWrapper>
						<Tour />
						<SearchBarArea>{!isMini && <SearchBar filter={filter} setFilter={setFilter} setFlag={true} />}</SearchBarArea>
					</NewHeaderWrapper>
				)}
				<SideContainer />
			</StyleHeader>
			<StyleMain>
				{data.length > 0 ? (
					<MainWrapper>
						<StyleRooms>
							<Rooms data={data} filter={filter} />
						</StyleRooms>
						<StyleMap>
							<MapMemo data={data} />
						</StyleMap>
					</MainWrapper>
				) : (
					<Loading>숙소를 불러오는 중...</Loading>
				)}
			</StyleMain>

			{isModalOn && (
				<ModalBg onClick={handleBgClick}>
					<BookModal onClick={handleModalClick}>
						<BookContent cardInfo={cardInfo} />
					</BookModal>
				</ModalBg>
			)}
		</>
	);
}

const BookModal = styled.div`
	width: 400px;
	height: 542px;
	position: absolute;
	top: 25%;
	left: 760px;
	background-color: #ffffff;
`;

const ModalBg = styled.div`
	top: 0;
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: #333333;
	background: rgba(0, 0, 0, 0.4);
	z-index: 1000;
`;

const StyleHeader = styled.div`
	position: sticky;
	padding: 10px 50px;
	top: 0;
	display: grid;
	grid-template-columns: 4fr 2fr 4fr;
	align-items: center;
	box-shadow: 0px 0px 4px rgba(204, 204, 204, 0.5), 0px 2px 4px rgba(0, 0, 0, 0.25);
	backdrop-filter: blur(4px);
	z-index: 1;
`;

const NewHeaderWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const StyleMain = styled.div`
	height: 800px;
`;

const SearchBarArea = styled.div``;

const MainWrapper = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
`;

const StyleRooms = styled.div`
	width: 100%;
	height: 800px;
	padding-top: 10px;
	padding-left: 50px;
	overflow-y: scroll;
	::-webkit-scrollbar {
		display: none;
	}
`;

const StyleMap = styled.div`
	width: 100%;
	padding-top: 10px;
	padding-right: 50px;
`;

const Loading = styled.div`
	display: flex;
	position: absolute;
	top: 40%;
	left: 40%;
	justify-content: center;
	align-items: center;
	font-size: 50px;
	font-weight: 700;
`;
