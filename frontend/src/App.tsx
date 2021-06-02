import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/main/header/Header";
import Main from "./components/main/Main";
import SearchResult from "./components/search_result/SearchResult";
import {cityState, checkInState, checkOutState, minPriceState, maxPriceState, numOfPeopleState, urlState} from './atoms';
import {useRecoilState} from 'recoil';

interface FilterProps {
	city?: string | undefined;
	checkIn?: string | undefined;
	checkOut?: string | undefined;
	minPrice?: string | undefined;
	maxPrice?: string | undefined;
	numOfPeople?: string | undefined;
}

interface GlobalProps {
	filter: any;
	setFilter: any;
	setFlag: any;
	numOfPeople: number;
}
function App() {
	const [filter, setFilter] = useState<FilterProps>({ city: undefined, checkIn: undefined, checkOut: undefined, minPrice: "0", maxPrice: "100000", numOfPeople: undefined });
	const [flag, setFlag] = useState(false);
	const [numOfPeople] = useRecoilState(numOfPeopleState);
	console.log('사람수: ' + numOfPeople);
	
	
	return (
		<>
			<RouterComponent filter={filter} setFilter={setFilter} setFlag={setFlag} numOfPeople={numOfPeople}/>
		</>
	);
}

export default App;

const RouterComponent = ({ filter, setFilter, setFlag, numOfPeople }: GlobalProps) => {
	const [url] = useRecoilState(urlState);
	const [numOfPeople2] = useRecoilState(numOfPeopleState);
	return(
		
		<Router>
		<Switch>
			<Route path={`/${url}`}>
		<SearchResult filter={filter} setFilter={setFilter} tmp={"hi"} numOfPeople={numOfPeople2}/>
			</Route>
			<Route exact path="/">
				<MainWrapper>
					<Header />
					<Main filter={filter} setFilter={setFilter} setFlag={setFlag} />
				</MainWrapper>
			</Route>
		</Switch>
	</Router>
		)};

const MainWrapper = styled.div`
	background: url("/hero.jpg") no-repeat;
	background-size: 1920px 75%;
	min-width: 1280px;
	min-height: 1280px;
	padding: 30px 100px;
`;
