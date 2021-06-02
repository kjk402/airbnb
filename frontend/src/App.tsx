import { useState, useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/main/header/Header";
import Main from "./components/main/Main";
import SearchResult from "./components/search_result/SearchResult";

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
}
function App() {
	const [filter, setFilter] = useState<FilterProps>({ city: undefined, checkIn: undefined, checkOut: undefined, minPrice: "0", maxPrice: "100000", numOfPeople: undefined });
	const [flag, setFlag] = useState(false);
	console.log(filter);
	if (flag) setFilter(filter);
	return (
		<>
			<RouterComponent filter={filter} setFilter={setFilter} setFlag={setFlag} />
		</>
	);
}

export default App;

const RouterComponent = ({ filter, setFilter, setFlag }: GlobalProps) => (
	<Router>
		<Switch>
			<Route path="/search_result">
				<SearchResult filter={filter} setFilter={setFilter} tmp={"hi"} />
			</Route>
			<Route exact path="/">
				<MainWrapper>
					<Header />
					<Main filter={filter} setFilter={setFilter} setFlag={setFlag} />
				</MainWrapper>
			</Route>
		</Switch>
	</Router>
);

const MainWrapper = styled.div`
	background: url("/hero.jpg") no-repeat;
	background-size: 1920px 75%;
	min-width: 1280px;
	min-height: 1280px;
	padding: 30px 100px;
`;
