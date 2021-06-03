export const parseURL = (url: string): string => {
	let newUrl = "http://52.78.158.138";
	for (let i = 21; i < url.length; i++) {
		newUrl += url[i];
	}

	return newUrl;
};
