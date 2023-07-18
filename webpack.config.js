const path = require('path');

module.exports = {
	mode: 'development',
	devtool: 'inline-source-map',
	entry: [
		__dirname + '/src/css/styles.scss',
		__dirname + '/src/js/main.js'
	],
	output : {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].js',
		publicPath: 'auto'
	},
	module: {
		rules: [
			{
				test: /\.m?jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'file-loader',
						options: { outputPath: 'css/', name: '[name].css'}
					},
					'sass-loader'
				]
			}
		]
	}
}
