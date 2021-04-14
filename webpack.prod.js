// const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { common, getPages } = require('./webpack.common');

// const ASSET_PATH = process.env.ASSET_PATH || 'auto';
const pages = getPages();

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'build'),
        // publicPath: ASSET_PATH,
        publicPath: 'auto',
    },
    optimization: {
        minimizer: [new CssMinimizerWebpackPlugin(), new TerserPlugin()],
    },
    plugins: [
        // new webpack.DefinePlugin({
        //     'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
        // }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
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
                test: /\.(s*)css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
});
