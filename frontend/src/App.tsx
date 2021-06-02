import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/main/header/Header";
import Main from "./components/main/Main";
import SearchResult from "./components/search_result/SearchResult";

function App() {
	return (
		<>
			<RouterComponent />
		</>
	);
}

export default App;

const RouterComponent = () => (
	<Router>
		<Switch>
			<Route path="/search_result">
				<SearchResult />
			</Route>
			<Route exact path="/">
				<MainWrapper>
					<Header />
					<Main />
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
