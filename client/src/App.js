import React, { Component } from 'react';
import './App.css';

import { Footer } from '@auth0/styleguide-react-components';
import Header from './components/Header';
import Spinner from './components/Spinner';
import Breadcrumb from "./components/Breadcrumb";
import Ticket from "./components/Ticket";

class App extends Component {

	constructor(props) {
		super(props);

		this.onCommentFormSubmit = this.onCommentFormSubmit.bind(this);
	}

	state = {};

	componentDidMount() {
		// TODO use React-router to get params
		fetch(`/api/tickets/${window.location.pathname.split('/').pop()}`)
			.then(res => res.json())
			.then(ticket => this.setState({ ticket }));
	}

	onCommentFormSubmit(commentBody) {
		return fetch(`/api/tickets/${window.location.pathname.split('/').pop()}`, {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'PUT',
			body: JSON.stringify({comment: commentBody})
		}).then(res => res.json()).then(comment => {
			const updatedTicket = Object.assign({}, this.state.ticket);

			updatedTicket.comments.push(comment);
			this.setState({ticket: updatedTicket});

			return comment;
		});
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

						<Ticket ticket={this.state.ticket} onCommentFormSubmit={this.onCommentFormSubmit}/>
					</div>
				}
				</div>
				<Footer />
			</div>
		);
	}
}

export default App;
