import React, { Component } from 'react';

import { FormControl, Button, ControlLabel, FormGroup } from '@auth0/styleguide-react-components';
import Spinner from '../../../../components/Spinner';
import sleep from '../../../../utils/sleep'

import './CommentForm.css'


class CommentForm extends Component {
	state = {};
	STATE_LOADING = 'loading';
	STATE_SUCCESS = 'success';

	constructor(props) {
		super(props);
		this.state = {
			value: '',
			state: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		this.setState({state: this.STATE_LOADING});
		this.props.onSubmit(this.state.value).then(async comment => {
			this.setState({value: '', state: this.STATE_SUCCESS});
			await sleep(2000);
			this.setState({state: ''});
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
			<form className="row comment-form" onSubmit={this.handleSubmit}>
				<FormGroup controlId="commentFormTextarea">
					<ControlLabel className="comment-form-label">Write your comment</ControlLabel>
					<FormControl componentClass="textarea" className="comment-form-textarea" placeholder="Type your comment here..."  value={this.state.value} onChange={this.handleChange} onKeyUp={this.handleKeyPress} required />
				</FormGroup>
				<Button className="comment-form-button" type="submit" bsStyle="primary">Reply</Button>
				{this.state.state && <div className="comment-form-overlay">
					{this.state.state === this.STATE_LOADING && <Spinner/>}
					{this.state.state === this.STATE_SUCCESS && <i className="comment-form-success icon-budicon-390 icon" />}
				</div>}
			</form>
		);
	}
}

export default CommentForm;
