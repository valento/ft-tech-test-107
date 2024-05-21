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
				<link rel="stylesheet" href="https://www.ft.com/__origami/service/build/v3/bundles/css?components=o-grid@^6.0.0&brand=core&system_code=$$$-no-bizops-system-code-$$$"/>
				
				<script src="https://www.ft.com/__origami/service/build/v3/bundles/js?components=o-table@^9.0.2,o-autoinit@^3.0.0&system_code=$$$-no-bizops-system-code-$$$" defer></script>
				<script src="/dist/js/main.js" defer></script>
			</head>
			<body>
				<Home {...props} />
			</body>
		</html>
	);
};
