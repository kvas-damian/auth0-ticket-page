import React from 'react';
import TimeAgo from 'react-timeago';
import Comment from "./components/Comment";

import './Ticket.css';

function Ticket(props) {
	const firstComment = props.ticket.comments[0];

	return (
		<div>
			<h1>{props.ticket && props.ticket.subject}</h1>
			<div className="ticket-body row">
				<div className="col-md-1">
					<img className="avatar" src={firstComment.author.photo} />
				</div>
				<div className="col-md-11">
					<h4>{firstComment.author.name} <TimeAgo date={firstComment.created_at} /></h4>
					{firstComment.body}
				</div>
			</div>
			<h2>Comments</h2>
			{props.ticket.comments.slice(1).map(comment =>
				<Comment key={comment.id} comment={comment} primary={props.ticket.submitter_id === comment.author_id}/>
			)}
		</div>
	);
}

export default Ticket;
