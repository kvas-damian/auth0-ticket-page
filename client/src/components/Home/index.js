import React from 'react';

import Auth from '../../Auth/Auth.js';

function Home(props) {
	const auth = new Auth();

	return (
		<div>
			<a href="/tickets/2"> Ticket 2</a>
		</div>
	);
}

export default Home;
