import React, { Component } from 'react';
import './App.css';

import { Footer } from '@auth0/styleguide-react-components';
import Header from './components/Header';
import Spinner from './components/Spinner';
import Breadcrumb from "./components/Breadcrumb";
import Ticket from "./components/Ticket";

class App extends Component {
	state = {};

	componentDidMount() {
		// TODO use React-router to get params
		fetch(`/api/tickets/${window.location.pathname.split('/').pop()}`)
			.then(res => res.json())
			.then(ticket => this.setState({ ticket }));
	}

	render() {
		const breadcrumbItems = [{link: '/', text: 'Home'}, {link: '/tickets', text: 'Tickets'}];

		if (this.state.ticket) {
			breadcrumbItems.push({link: `/tickets/${this.state.ticket.id}`, text: this.state.ticket.subject})
		}

		return (
			<div className="App">
				<Header />
				<div className="container">
					<Breadcrumb items={breadcrumbItems}/>
				{!this.state.ticket ?
					<div className="loading-screen">
						<Spinner/>
					</div>
					:
					<div>

						<Ticket ticket={this.state.ticket} />
					</div>
				}
				</div>
				<Footer />
			</div>
		);
	}
}

export default App;
