import React from 'react';

import Auth from '../../Auth/Auth.js';

function Home(props) {
	const auth = new Auth();

	return (
		auth.login()
	);
}

export default Home;
