export interface Urls {
	type: "string";
	checkIn: "string";
	checkOut: "string";
	city: "string";
	minPrice: "string";
	maxPrice: "string";
	numOfPeople: "string";
}

export const getURL = (type: string, checkIn: string, checkOut: string, city: string, minPrice?: string, maxPrice?: string, numOfPeople?: string): string => {
	let result = "";
	if (type === "price") result = `http://52.78.158.138/rooms/prices?checkIn=${checkIn}&checkOut=${checkOut}&cityName=${city}`;
	else result = `http://52.78.158.138/rooms/search?checkIn=${checkIn}&checkOut=${checkOut}&cityName=${city}&maxPrice=${maxPrice}&minPrice=${minPrice}&numOfPeople=${numOfPeople}`;
	return result;
};

// let tempCheckIn = '2021-05-20';
// let tempCheckOut = '2021-05-25'
// let tempCity = "인천"
// let tempMinPrice = "30000";
// let tempMaxPrice = "100000";
// let tempNumOfPeople = '1';
