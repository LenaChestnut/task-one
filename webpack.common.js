const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const readDir = require('fs-readdir-recursive');

module.exports.getPages = function getPages() {
    const pages = readDir(path.resolve(__dirname, 'src'))
        .filter((filename) => filename.endsWith('.pug'))
        .map((filename) => filename.replace(/\.pug/, ''));

    return pages;
};

module.exports.common = {
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
    plugins: [new ESLintPlugin()],
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
