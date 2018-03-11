import React, { Component } from 'react';
import './App.css';

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
				<h1>{this.state.ticket && this.state.ticket.subject}</h1>
				<h2>Ticket: {this.state.ticket && this.state.ticket.id}</h2>
				{this.state.ticket && this.state.ticket.comments.map(comment =>
					<div key={comment.id}>{comment.body}</div>
				)}
			</div>
	);
	}
}

export default App;
