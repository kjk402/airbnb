import { atom } from "recoil";

export const cityState = atom({
	key: "city",
	default: "",
});

export const checkInState = atom({
	key: "checkIn",
	default: "",
});

export const checkOutState = atom({
	key: "checkOut",
	default: "",
});

export const minPriceState = atom({
	key: "minPrice",
	default: "0",
});

export const maxPriceState = atom({
	key: "maxPrice",
	default: "100000",
});

export const numOfPeopleState = atom({
	key: "numOfPeople",
	default: 0,
});

export const urlState = atom({
	key: "url",
	default: "1",
});

export const bookModalState = atom({
	key: "bookModal",
	default: false,
});

export const cardInfoState = atom({
	key: "cardData",
	default: {},
});

export const filterState = atom({
	key: "filter",
	default: {},
});
