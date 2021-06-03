import styled from "styled-components";
import { ReactComponent as SearchBtn } from "./../../icons/search.svg";
import makeKRW from "./../../utils/makeKRW";

export interface IAppProps {
	filter: any;
}

export default function MiniSearchBar({ filter }: IAppProps) {
	const checkInSchedule = filter.checkIn.split("-");
	const checkOutSchedule = filter.checkOut.split("-");
	const checkInMonth = Number(checkInSchedule[1]);
	const checkInDay = Number(checkInSchedule[2]);
	const checkOutMonth = Number(checkOutSchedule[1]);
	const checkOutDay = Number(checkOutSchedule[2]);
	const minPrice = makeKRW(Number(filter.minPrice));
	const maxPrice = makeKRW(Number(filter.maxPrice));
	const numOfPeople = filter.numOfPeople;

	return (
		<Wrapper>
			<StyleMiniSearch>
				<FilterWrapper>
					<StyleFilter>
						{checkInMonth}월 {checkInDay}일 - {checkOutMonth}월 {checkOutDay}일
					</StyleFilter>
					<StyleFilter>
						₩{minPrice} ~ ₩{maxPrice}
					</StyleFilter>
					<StyleFilter>게스트 {numOfPeople}명</StyleFilter>
				</FilterWrapper>
				<SearchBtnWrapper>
					<SearchBtn stroke="#ffffff" width="20" height="20" />
				</SearchBtnWrapper>
			</StyleMiniSearch>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
`;

const StyleMiniSearch = styled.div`
	display: flex;
	align-items: center;
	width: 410px;
	height: 48px;
	border: 1px solid #bdbdbd;
	border-radius: 30px;
	:hover {
		cursor: pointer;
	}
`;

const FilterWrapper = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-evenly;
	align-items: center;
`;

const StyleFilter = styled.div`
	font-size: 12px;
`;

const SearchBtnWrapper = styled.button`
	position: relative;
	left: -10px;
	border-radius: 50%;
	width: 32px;
	height: 32px;
	background-color: #e84c60;
	transition: background-color 0.5s;
	:hover {
		background-color: #d12038;
	}
`;
