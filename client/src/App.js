import React, { Component } from 'react';
import './App.css';

import { Footer } from '@auth0/styleguide-react-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import TicketPage from "./components/TicketPage/TicketPage";

class App extends Component {

	state = {};

	render() {
		return (
			<div className="App">
				<Header />
					<Router>
						<div className="container">
							<Route exact path="/" component={Home}/>
							<Route path="/tickets/:id" component={TicketPage} />
						</div>
					</Router>
				<Footer />
			</div>
		);
	}
}

export default App;
