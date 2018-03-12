import React from 'react';

function Breadcrumb(props) {
	return (
		<ol class="breadcrumb has-homepage">
			{props.items.map(item =>
				<li><a href={item.link}>{item.text}</a></li>
			)}
		</ol>
	);
}

export default Breadcrumb;
