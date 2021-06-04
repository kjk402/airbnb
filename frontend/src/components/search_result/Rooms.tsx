import { useEffect } from "react";
import styled from "styled-components";
import RoomCard from "./RoomCard";
import makeKRW from "./../../utils/makeKRW";
import { useRecoilState } from "recoil";
import { filterState } from "./../../atoms";

export interface roomInfoI {
	room: object;
	thumbImage: string;
	receipt: object;
}

export interface IAppProps {
	data: any;
	filter: any;
}

export default function Rooms({ data, filter }: IAppProps) {
	const roomList = data.map((info: object, key: number) => <RoomCard key={key} info={info} />);
	const checkInSchedule = filter.checkIn.split("-");
	const checkOutSchedule = filter.checkOut.split("-");
	const checkInMonth = Number(checkInSchedule[1]);
	const checkInDay = Number(checkInSchedule[2]);
	const checkOutMonth = Number(checkOutSchedule[1]);
	const checkOutDay = Number(checkOutSchedule[2]);
	const minPrice = makeKRW(Number(filter.minPrice));
	const maxPrice = makeKRW(Number(filter.maxPrice));
	const [filterData, setFilterData] = useRecoilState(filterState);
	useEffect(() => {
		setFilterData(filter);
	}, []);

	return (
		<RoomsWrapper>
			<div className="summary">
				{data.length}개 이상의 숙소 - {checkInMonth}월 {checkInDay}일 - {checkOutMonth}월 {checkOutDay}일 - {minPrice}원~{maxPrice}원 - 게스트 {filter.numOfPeople}명
			</div>
			<div className="rooms_title">지도에서 선택한 지역의 숙소</div>
			<div>{roomList}</div>
		</RoomsWrapper>
	);
}

const RoomsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	top: 30px;

	.summary {
		font-size: 12px;
	}

	.rooms_title {
		font-size: 24px;
		font-weight: 700;
		padding: 0.5em 0;
		margin-bottom: 20px;
	}
`;
