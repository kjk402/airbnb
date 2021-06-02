import { useEffect } from "react";

export interface SearchResultProps {
	filter: any;
	setFilter: any;
	tmp: string;
}

export default function SearchResult({ filter, setFilter, tmp }: SearchResultProps) {
	useEffect(() => {
		console.log(filter);
	});
	return (
		<div>
			<div>검색결과</div>
			<div>{tmp}</div>
		</div>
	);
}
