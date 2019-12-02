import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import StateProvider from './components/contextProvider/StateProvider';
import ScrollToTop from './components/ScrollToTop';
import AppRouter from './routers/AppRouter';
import './css/App.css';
import './css/Color.css';
import './css/Animations.css';
import './css/responsive.css';

const App = () => (
	<Router>
		<ScrollToTop>
			<StateProvider>
				<AppRouter />
			</StateProvider>
		</ScrollToTop>
	</Router>
);

export default App;
