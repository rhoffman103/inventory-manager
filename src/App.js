import React from 'react';
import { BrowserRouter as Router /*, Route, Switch*/ } from "react-router-dom";
import StateProvider from './components/contextProvider/StateProvider';
import ScrollToTop from './components/ScrollToTop';
import AppRouter from './routers/AppRouter';
// import Home from './pages/Home';
// import Admin from './pages/Admin';
// import Production from './pages/Production';
import './css/App.css';
import './css/Color.css';
import './css/Animations.css';
import './css/responsive.css';

const App = () => (
	<Router>
		<ScrollToTop>
			<StateProvider>
				<AppRouter />
				{/* <Switch>
					<Route exact path="/" component={Home} />
					<Route path="/admin" component={Admin} />
					<Route path="/production" component={Production} />
				</Switch> */}
			</StateProvider>
		</ScrollToTop>
	</Router>
);

export default App;
