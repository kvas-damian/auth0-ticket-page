import React from 'react';
import TimeAgo from 'react-timeago';
import Comment from "./components/Comment";
import Avatar from "./components/Avatar";
import CommentForm from "./components/CommentForm";

import './Ticket.css';
import CollaboratorsList from "../CollaboratorsList";

function Ticket(props) {
	const firstComment = props.ticket.comments[0];

	return (
		<div>
			<h1>{props.ticket && props.ticket.subject}</h1>
			<div className="ticket-body row">
				<div className="col-md-1">
					<Avatar author={firstComment.author}/>
				</div>
				<div className="col-md-7">
					<h4>{firstComment.author.name} <TimeAgo date={firstComment.created_at} /></h4>
					<div dangerouslySetInnerHTML={{__html: firstComment.html_body}} />
				</div>
				{props.ticket.collaborators && props.ticket.collaborators.length > 0 &&
					<div className="col-md-4">
						<CollaboratorsList collaborators={props.ticket.collaborators}/>
					</div>
				}
			</div>
			{props.ticket.comments.length > 1 &&
				<div className="row">
					<h2>Comments</h2>
					{props.ticket.comments.slice(1).map(comment =>
						<Comment key={comment.id} comment={comment} primary={props.ticket.submitter_id === comment.author_id}/>
					)}
				</div>
			}
			<CommentForm onSubmit={props.onCommentFormSubmit}/>
		</div>
	);
}

export default Ticket;
