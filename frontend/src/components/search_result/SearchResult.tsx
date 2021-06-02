import { useEffect } from "react";
import {useRecoilState} from 'recoil';
import {cityState, checkInState, checkOutState, minPriceState, maxPriceState, numOfPeopleState} from './../../atoms';

export interface SearchResultProps {
	filter: any;
	setFilter: any;
	tmp: string;
	numOfPeople: number;
}


export default function SearchResult({ filter, setFilter, tmp, numOfPeople}: SearchResultProps) {
	const [numOfPeople2] = useRecoilState(numOfPeopleState);
	console.log('검색결과...' + numOfPeople);
	console.log('검색결과...' + numOfPeople2);
	console.log(filter);
	useEffect(() => {
		console.log('검색결과:' + numOfPeople2);
		console.log('검색결과:' + numOfPeople);
	});
	return (
		<div>
			<div>검색결과</div>
			<div>{tmp}</div>
			<div>{numOfPeople}</div>
			<div>{filter.numOfPeople}</div>
		</div>
	);
}
