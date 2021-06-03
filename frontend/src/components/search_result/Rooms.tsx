import styled from "styled-components";
import RoomCard from "./RoomCard";

export interface roomInfoI {
	room: object;
	thumbImage: string;
	receipt: object;
}

export interface IAppProps {
	data: any;
	filter: object;
}

export default function Rooms({ data, filter }: IAppProps) {
	const roomList = data.map((info: object) => <RoomCard info={info} />);
	console.log(filter);
	return (
		<RoomsWrapper>
			<div className="summary">{data.length}개 이상의 숙소 - 5월 12일 - 5월 18일 - 100,000원~100,000원 - 게스트 3명</div>
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
