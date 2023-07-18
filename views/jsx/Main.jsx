/** this is a generic layout template,  */
import React from 'react';
import Home from './Components/Home';

export default function Main(props) {

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, intial-scale=1.0" />
				<title>Financial Times technical test</title>
				<link rel="stylesheet" type="text/css" href="/dist/css/styles.css" />
				<script src="/dist/js/main.js" defer></script>
			</head>
			<body>
				<Home {...props} />
			</body>
		</html>
	);
};
