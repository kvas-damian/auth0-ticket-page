import React from 'react';

function CollaboratorsList(props) {

	return (
		<ul>
			{props.collaborators && props.collaborators.map(user => <li>{user.name} ({user.email})</li>)}
		</ul>
	);
}

export default CollaboratorsList;
