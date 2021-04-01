const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getPages = require('fs-readdir-recursive');

const pages = getPages(path.resolve(__dirname, 'src'))
    .filter((filename) => filename.endsWith('.pug'))
    .map((filename) => filename.replace(/\.pug/, ''));

module.exports = {
    entry: './src/index.js',
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    plugins: [
        new ESLintPlugin(),
        ...pages.map(
            (page) =>
                new HtmlWebpackPlugin({
                    template: `./src/${page}.pug`,
                    filename: `${page}.html`,
                    minify: {
                        removeAttributeQuotes: true,
                        collapseWhitespace: true,
                        removeComments: true,
                    },
                })
        ),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.pug$/,
                use: ['pug-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]',
                },
            },
        ],
    },
};
