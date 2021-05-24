const parseByType = (pos: string, type: string): string => {
	let result = "";
	if (pos === "placeholder") {
		switch (type) {
			case "LOCATION":
				result = "어디로 여행가세요?";
				break;
			case "CHECKIN":
			case "CHECKOUT":
				result = "날짜 입력";
				break;
			case "FEE":
				result = "금액대 설정";
				break;
			case "GUEST":
				result = "게스트 추가";
				break;
		}
	} else if (pos === "title") {
		switch (type) {
			case "LOCATION":
				result = "위치";
				break;
			case "CHECKIN":
				result = "체크인";
				break;
			case "CHECKOUT":
				result = "체크아웃";
				break;
			case "FEE":
				result = "요금";
				break;
			case "GUEST":
				result = "인원";
				break;
		}
	}
	return result;
};

export default parseByType;
