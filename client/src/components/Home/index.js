import React, { Component } from 'react';

import Spinner from '../Spinner';

class Home extends Component {
	STATE_DONE = 'done';
	STATE_ERROR = 'error';
	STATE_LOADING = 'loading';
	STATE_NOT_FOUND = 'not-found';

	state = {
		state: '',
		tickets: []
	};

	componentDidMount() {
		if (this.props.auth.isAuthenticated()) {
			this.setState({state: this.STATE_LOADING});

			fetch(`/api/tickets`, { headers: { 'Authorization': `Bearer ${this.props.auth.getAccessToken()}`} } )
				.then(res => {
					if (res.status === 404) {
						this.setState({ state: this.STATE_NOT_FOUND });
					} else if (res.status >= 400) {
						this.setState({ state: this.STATE_ERROR });
					} else {
						res.json().then(tickets => this.setState({ state: this.STATE_DONE, tickets}));
					}
				})
		}
	}

	render() {
		return (
			<div>
				{ this.state.state === this.STATE_LOADING &&
					<div className="loading-screen">
						<Spinner/>
					</div>
				}
				<ul>
				{ this.state.tickets.map(ticket => <li><a href={`/tickets/${ticket.id}`}>{ticket.subject}</a></li>) }
				</ul>
			</div>
		);
	}
}

export default Home;
