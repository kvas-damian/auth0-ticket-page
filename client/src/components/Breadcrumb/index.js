import React from 'react';

function Breadcrumb(props) {
	return (
		<ol className="breadcrumb has-homepage">
			{props.items.map(item =>
				<li key={item.link}><a href={item.link}>{item.text}</a></li>
			)}
		</ol>
	);
}

export default Breadcrumb;
