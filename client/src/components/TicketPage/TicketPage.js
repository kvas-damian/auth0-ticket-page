import React, { Component } from 'react';

import Spinner from '../Spinner';
import Breadcrumb from "../Breadcrumb";
import Ticket from "../Ticket";

class TicketPage extends Component {

	constructor(props) {
		super(props);

		this.onCommentFormSubmit = this.onCommentFormSubmit.bind(this);
	}

	state = {};

	componentDidMount() {
		fetch(`/api/tickets/${this.props.match.params.id}`)
			.then(res => res.json())
			.then(ticket => this.setState({ ticket }));
	}

	onCommentFormSubmit(commentBody) {
		return fetch(`/api/tickets/${this.props.match.params.id}`, {
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
		);
	}
}

export default TicketPage;