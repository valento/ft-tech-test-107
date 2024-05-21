/** You can submit this test using either Handlebars or JSX as a templating engine. This is the file to work in if you would like to use JSX */

import React from 'react'

export default function Home({ pageTitle, data }) {
	const hero = (
		<>
			<h1>{pageTitle}</h1>
		</>
	)

	return (
		<>
			{hero}
			<div id='ft-quotes-feed' style={{display: 'flex', flexDirection: 'row', flex: 1, gap: 20}}>
			{
				data && data.data.map( (item, ind) => (
					<p key={ind}>{JSON.parse(JSON.stringify(item.items[0].symbolInput))} :
						{(Number(JSON.stringify(item.items[0].quote.lastPrice)).toFixed(2)).concat('%')}
					</p>
				))
			}
			</div>
		</>

	)

};
