import React, { Component } from 'react';

import { FormControl, Button, ControlLabel, FormGroup } from '@auth0/styleguide-react-components';
import './CommentForm.css'


class CommentForm extends Component {
	state = {};

	constructor(props) {
		super(props);
		this.state = {
			value: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		fetch(`/api/tickets/${window.location.pathname.split('/').pop()}`, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			},
			method: 'PUT',
			body: `comment=${encodeURIComponent(this.state.value)}`
		});

		event && event.preventDefault();
	}

	handleKeyPress(event) {
		if (event.keyCode === 13 && (event.metaKey || event.ctrlKey)) {
			this.handleSubmit();
		}
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<FormGroup controlId="commentFormTextarea">
					<ControlLabel className="comment-form-label">Write your comment</ControlLabel>
					<FormControl componentClass="textarea" className="comment-form-textarea" placeholder="Type your comment here..."  value={this.state.value} onChange={this.handleChange} onKeyUp={this.handleKeyPress} required />
				</FormGroup>
				<Button className="comment-form-button" type="submit" bsStyle="primary">Reply</Button>
			</form>
		);
	}
}

export default CommentForm;
