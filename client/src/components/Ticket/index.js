import React from 'react';
import Comment from "./components/Comment";

function Ticket(props) {
	return (
		<div>
			<h1>{props.ticket && props.ticket.subject}</h1>
			{props.ticket.comments.map(comment =>
				<Comment key={comment.id} comment={comment} primary={props.ticket.submitter_id === comment.author_id}/>
			)}
		</div>
	);
}

export default Ticket;
