import React from 'react';

function CollaboratorsList(props) {

	return (
		<div>
			<h3>Collaborators</h3>
			<ul>
				{props.collaborators && props.collaborators.map(user => <li>{user.name} ({user.email})</li>)}
			</ul>
		</div>
	);
}

export default CollaboratorsList;
