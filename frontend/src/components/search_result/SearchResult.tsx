import { useEffect, useState } from "react";

export default function SearchResult() {
	const URL = parseURL(window.location.href);
	console.log(URL);
	const [data, setData] = useState();

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
	console.log(data);

	return (
		<div>
			<div>검색결과</div>
		</div>
	);
}

const parseURL = (url: string): string => {
	let newUrl = "http://52.78.158.138";
	for (let i = 21; i < url.length; i++) {
		newUrl += url[i];
	}

	return newUrl;
};
