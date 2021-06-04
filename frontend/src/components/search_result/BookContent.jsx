import styled from "styled-components";
import { useRecoilState } from "recoil";
import { filterState } from "../../atoms";
import makeKRW from "./../../utils/makeKRW";

export default function BookContent({ cardInfo }) {
	const [filterData, setFilterData] = useRecoilState(filterState);
	const { checkIn, checkOut, numOfPeople } = filterData;
	const checkInSchedule = filterData.checkIn.split("-");
	const checkOutSchedule = filterData.checkOut.split("-");
	const checkInYear = checkInSchedule[0];
	const checkInMonth = Number(checkInSchedule[1]);
	const checkInDay = Number(checkInSchedule[2]);
	const checkOutYear = checkOutSchedule[0];
	const checkOutMonth = Number(checkOutSchedule[1]);
	const checkOutDay = Number(checkOutSchedule[2]);
	const { receipt, room } = cardInfo;

	const checkInDate = new Date(checkIn);
	const checkOutDate = new Date(checkOut);
	const days = (checkOutDate - checkInDate) / 24 / 60 / 60 / 1000;

	return (
		<Wrapper>
			<Content>
				<PriceReview>
					{" "}
					<div>
						<span className="price">₩{makeKRW(room.pricePerDay)}</span>
						<span> / 박</span>
					</div>{" "}
					<div className="review">후기 N개</div>
				</PriceReview>
				<Filter>
					<Schedule>
						<CheckIn>
							<div>체크인</div>
							<div>
								{checkInYear}. {checkInMonth}. {checkInDay}.
							</div>
						</CheckIn>
						<CheckOut>
							<div>체크아웃</div>
							<div>
								{checkOutYear}. {checkOutMonth}. {checkOutDay}.
							</div>
						</CheckOut>
					</Schedule>
					<NumOfPeople>
						<div>인원</div>
						<div>게스트 {numOfPeople}명</div>
					</NumOfPeople>
				</Filter>
				<BookBtn>예약하기</BookBtn>
				<Notice>예약 확정 전에는 요금이 청구되지 않습니다.</Notice>
				<FeeInfo>
					<FeeDiv>
						<div className="info">
							₩{makeKRW(room.pricePerDay)} x {days}박
						</div>
						<div className="fee">₩{makeKRW(receipt.basicPrice)}</div>
					</FeeDiv>
					<FeeDiv>
						<div className="info">4% 주 단위 요금 할인 </div>
						<div className="fee sale">-₩{makeKRW(receipt.weekSalePrice)}</div>
					</FeeDiv>
					<FeeDiv>
						<div className="info">청소비</div>
						<div className="fee">₩{makeKRW(receipt.cleaningFee)}</div>
					</FeeDiv>
					<FeeDiv>
						<div className="info">서비스 수수료</div>
						<div className="fee">₩{makeKRW(receipt.serviceFee)}</div>
					</FeeDiv>
					<FeeDiv>
						<div className="info">숙박세와 수수료</div>
						<div className="fee">₩{makeKRW(receipt.resultFee)}</div>
					</FeeDiv>
				</FeeInfo>
				<FinalFee>
					<div className="info">총 합계</div>
					<div className="info">₩{makeKRW(receipt.totalPrice)}</div>
				</FinalFee>
			</Content>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Content = styled.div`
	/* border: 1px solid red; */
	width: 90%;
	height: 90%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const PriceReview = styled.div`
	display: flex;
	justify-content: space-between;
	font-size: 14px;
	color: #333333;

	.price {
		font-size: 20px;
		font-weight: 700;
	}

	.review {
		font-size: 12px;
		color: #828282;
		text-decoration: underline;
		align-self: center;
	}
`;

const Filter = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 353px;
	height: 107px;
	border: 1px solid #bdbdbd;
	border-radius: 10px;
`;

const Schedule = styled.div`
	display: flex;
	width: 100%;
	height: 50%;
`;

const CheckIn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	padding-left: 10px;
	width: 50%;
	border-right: 1px solid #bdbdbd;
`;

const CheckOut = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	padding-left: 10px;
	width: 50%;
`;

const NumOfPeople = styled.div`
	width: 100%;
	height: 50%;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	padding-left: 10px;
	border-top: 1px solid #bdbdbd;
`;

const BookBtn = styled.button`
	width: 352px;
	height: 55px;
	background-color: #333333;
	font-size: 16px;
	font-weight: 700;
	color: #ffffff;
	border-radius: 10px;
`;

const Notice = styled.div`
	width: 320px;
	height: 17px;
	color: #4f4f4f;
	font-size: 12px;
	text-align: center;
`;

const FeeInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 120px;
	width: 100%;
`;

const FeeDiv = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: 23px;
	.info {
		text-decoration: underline;
	}

	.sale {
		color: #118917;
	}
`;

const FinalFee = styled.div`
	display: flex;
	justify-content: space-between;
	font-weight: 700;
	border-top: 1px solid #e0e0e0;
	padding: 10px 0;

	.info {
		text-decoration: underline;
	}
`;
