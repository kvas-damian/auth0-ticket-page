import React from 'react';
import './Avatar.css';

function Comment(props) {

	return (
		<div>
			{props.author.photo ?
				<img className="avatar" src={props.author.photo} /> :
				<div className="avatar">{props.author.initials}</div>
			}
		</div>
	);
}

export default Comment;
