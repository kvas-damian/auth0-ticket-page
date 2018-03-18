import React, { Component } from 'react';
import './App.css';

import { Footer, Button } from '@auth0/styleguide-react-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import TicketPage from "./components/TicketPage/TicketPage";
import Auth from './Auth/Auth';
import Callback from './components/Callback';


class App extends Component {
	auth = new Auth();

	state = {};


	login() {
		this.auth.login();
	}

	logout() {
		this.auth.logout();
	}

	render() {
		const { isAuthenticated } = this.auth;
		const handleAuthentication = (nextState, replace) => {
			if (/access_token|id_token|error/.test(nextState.location.hash)) {
				this.auth.handleAuthentication();
			}
		};

		return (
			<div className="App">
				<Header />
					<Router>
						<div className="container">
							{
								!isAuthenticated() && (
									<Button
										bsStyle="primary"
										className="btn-margin"
										onClick={this.login.bind(this)}
									>
										Log In
									</Button>
								)
							}
							{
								isAuthenticated() && (
									<Button
										bsStyle="primary"
										className="btn-margin"
										onClick={this.logout.bind(this)}
									>
										Log Out
									</Button>
								)
							}
							<Route exact path="/" render={() => <Home auth={this.auth}/>} />
							<Route path="/tickets/:id" render={(params) => <TicketPage auth={this.auth} id={params.match.params.id}/> } />
							<Route path="/callback" render={(props) => {
								handleAuthentication(props);
								return <Callback {...props} />
							}}/>
						</div>
					</Router>
				<Footer />
			</div>
		);
	}
}

export default App;
