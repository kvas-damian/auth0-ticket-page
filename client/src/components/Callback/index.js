import React, { Component } from 'react';
import Spinner from '../Spinner';

class Callback extends Component {
	render() {
		return (
			<div className="loading-screen">
				<Spinner/>
			</div>
		);
	}
}

export default Callback;
