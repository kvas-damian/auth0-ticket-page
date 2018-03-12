import React from 'react';
import './Comment.css';

function Comment(props) {
	return (
		<div className={"comment col-xs-11 " + (props.primary ? '' : 'pull-right')}>
			{props.comment.body}
		</div>
	);
}

export default Comment;
