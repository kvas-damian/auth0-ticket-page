import React, { Component } from 'react';
import './App.css';

import { Footer } from '@auth0/styleguide-react-components';
import Header from './components/Header';

class App extends Component {
	state = {};

	componentDidMount() {
		// TODO use React-router to get params
		fetch(`/api/tickets/${window.location.pathname.split('/').pop()}`)
			.then(res => res.json())
			.then(ticket => this.setState({ ticket }));
	}

	render() {
		return (
			<div className="App">
				<Header />
				<h1>{this.state.ticket && this.state.ticket.subject}</h1>
				<h2>Ticket: {this.state.ticket && this.state.ticket.id}</h2>
				{this.state.ticket && this.state.ticket.comments.map(comment =>
					<div key={comment.id}>{comment.body}</div>
				)}
				<Footer />
			</div>
	);
	}
}

export default App;
