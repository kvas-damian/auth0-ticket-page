import React from 'react';
import TimeAgo from 'react-timeago';
import Avatar from '../Avatar'
import './Comment.css';

function Comment(props) {

	return (
		<div className={"comment col-xs-11 " + (props.primary ? '' : 'pull-right')}>
			<div className="col-md-1">
				<Avatar author={props.comment.author} />
			</div>
			<div className="col-md-11">
				<h4>{props.comment.author.name} <TimeAgo date={props.comment.created_at} /></h4>
				<div dangerouslySetInnerHTML={{__html: props.comment.html_body}} />
			</div>
		</div>
	);
}

export default Comment;
