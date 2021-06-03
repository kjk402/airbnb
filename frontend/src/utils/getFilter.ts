export const getFilter = (url: string): object => {
	const arr = url.split("&");

	const checkIn = arr[0].split("?")[1].split("=")[1];
	const checkOut = arr[1].split("=")[1];
	const city = arr[2].split("=")[1];
	const maxPrice = arr[3].split("=")[1];
	const minPrice = arr[4].split("=")[1];
	const numOfPeople = arr[5].split("=")[1];

	return { checkIn: checkIn, checkOut: checkOut, city: city, maxPrice: maxPrice, minPrice: minPrice, numOfPeople: numOfPeople };
};
