import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StateProvider from './components/contextProvider/StateProvider';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Admin from './pages/Admin';
import './App.css';
import './responsive.css';

const App = () => (
	<Router>
		<ScrollToTop>
			<StateProvider>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/admin" component={Admin} />
				</Switch>
			</StateProvider>
		</ScrollToTop>
	</Router>
);

export default App;
