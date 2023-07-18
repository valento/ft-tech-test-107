/** You can submit this test using either Handlebars or JSX as a templating engine. This is the file to work in if you would like to use JSX */

import React from 'react';

export default function Home(props) {

	const hero = (
		<>
			<h1>{props.pageTitle}</h1>
		</>
	);

	return (
		<>
			{hero}
			<p>{props.content}</p>
		</>
	);
};
