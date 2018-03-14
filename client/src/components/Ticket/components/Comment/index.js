import React from 'react';
import TimeAgo from 'react-timeago';
import './Comment.css';

function Comment(props) {
	return (
		<div className={"comment col-xs-11 " + (props.primary ? '' : 'pull-right')}>
			<div className="col-md-1">
				<img className="avatar" src={props.comment.author.photo} />
			</div>
			<div className="col-md-11">
				<h4>{props.comment.author.name} <TimeAgo date={props.comment.created_at} /></h4>
				{props.comment.body}
			</div>
		</div>
	);
}

export default Comment;
