import React, { Component } from 'react';
import './App.css';

import { Footer } from '@auth0/styleguide-react-components';
import Header from './components/Header';
import Spinner from './components/Spinner';
import Breadcrumb from "./components/Breadcrumb";

class App extends Component {
	state = {};

	componentDidMount() {
		// TODO use React-router to get params
		fetch(`/api/tickets/${window.location.pathname.split('/').pop()}`)
			.then(res => res.json())
			.then(ticket => this.setState({ ticket }));
	}

	render() {
		// TODO add ticket page
		const breadcrumbItems = [{link: '/', text: 'Home'}, {link: '/tickets', text: 'Tickets'}];

		return (
			<div className="App">
				<Header />
				<div class="container">
				{!this.state.ticket ?
					<Spinner/>
					:
					<div>
						<Breadcrumb items={breadcrumbItems}/>

						<h1>{this.state.ticket && this.state.ticket.subject}</h1>
						<h2>Ticket: {this.state.ticket && this.state.ticket.id}</h2>
						{this.state.ticket && this.state.ticket.comments.map(comment =>
							<div key={comment.id}>{comment.body}</div>
						)}
					</div>
				}
				</div>
				<Footer />
			</div>
		);
	}
}

export default App;
