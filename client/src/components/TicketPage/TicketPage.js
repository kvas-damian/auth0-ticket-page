import React, { Component } from 'react';

import Spinner from '../Spinner';
import Breadcrumb from "../Breadcrumb";
import Ticket from "../Ticket";

class TicketPage extends Component {
	STATE_DONE = 'done';
	STATE_ERROR = 'error';
	STATE_LOADING = 'loading';
	STATE_NOT_FOUND = 'not-found';

	constructor(props) {
		super(props);

		this.onCommentFormSubmit = this.onCommentFormSubmit.bind(this);
	}

	state = {
		state: this.STATE_LOADING
	};

	componentDidMount() {
		if (this.props.auth.isAuthenticated()) {
			fetch(`/api/tickets/${this.props.id}`, { headers: { 'Authorization': `Bearer ${this.props.auth.getAccessToken()}`} } )
				.then(res => {
					if (res.status === 404) {
						this.setState({ state: this.STATE_NOT_FOUND });
					} else if (res.status >= 400) {
						this.setState({ state: this.STATE_ERROR });
					} else {
						res.json().then(ticket => this.setState({ state: this.STATE_DONE, ticket}));
					}
				})
		}
	}

	onCommentFormSubmit(commentBody) {
		// TODO error handling
		return fetch(`/api/tickets/${this.props.id}`, {
			headers: {
				'Authorization': `Bearer ${this.props.auth.getAccessToken()}`,
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
			<div className="container">
			{ this.props.auth.isAuthenticated() ?
				<div>
				<Breadcrumb items={breadcrumbItems}/>
				{this.state.state === this.STATE_LOADING ?
					<div className="loading-screen">
						<Spinner/>
					</div>
					:
					<div>
					{(() => {
						switch(this.state.state) {
							case this.STATE_DONE:
								return (
									<Ticket ticket={this.state.ticket} onCommentFormSubmit={this.onCommentFormSubmit}/>
								);
							case this.STATE_NOT_FOUND:
								return (<div className="loading-screen">Ticket not found</div>);
							case this.STATE_ERROR:
								return (<div className="loading-screen">'The website encountered an unexpected error. Please try again later'</div>);
						}
					})()}
					</div>
				}
				</div> :
				<div className="loading-screen">You need to log in</div>
			}
			</div>
		);
	}
}

export default TicketPage;
