const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const { common, getPages } = require('./webpack.common');

const pages = getPages();

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-cheap-source-map',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        open: true,
    },
    plugins: [
        ...pages.map(
            (page) =>
                new HtmlWebpackPlugin({
                    template: `./src/${page}.pug`,
                    filename: `${page}.html`,
                })
        ),
    ],
    module: {
        rules: [
            {
                test: /\.(s*)css$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    target: 'web',
});
