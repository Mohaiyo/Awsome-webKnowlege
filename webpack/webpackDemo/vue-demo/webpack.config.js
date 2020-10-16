const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'
module.exports = {
  mode: 'development',
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name]-[hash].js'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.m?js$/,
				loader: 'babel-loader',
				exclude: /(node_modules|bower_components)/,
				options: {
					cacheDirectory: true
				}
			},
			{
				test: /\.css$/,
				use: [
					isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: true
						}
					}
				]
			}
		]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    // compress: true,
    open: true,
    port: 9000,
    hot: true
  },
  devtool: 'inline-source-map',
	plugins: [
    new CleanWebpackPlugin(),
		// 请确保引入这个插件！
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/style.css'
		}),
    new HtmlWebpackPlugin({ template: './public/index.html', title: '热替换测试', hash: true }),
    new webpack.HotModuleReplacementPlugin()
	]
}
