const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

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
