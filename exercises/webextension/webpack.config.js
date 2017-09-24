const path = require("path");
const webpack = require('webpack');

module.exports = {
    entry: {
        background: "./background_scripts/background.js",
        'grabber-script': "./content_scripts/grabber-script.js",
        'content-script': "./content_scripts/content-script.js",
    },
    output: {
        path: path.resolve(__dirname, "addon"),
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/, exclude: /node_modules|addon/, loader: 'babel-loader'
            }
        ]
    },
    devtool: 'sourcemap',
    plugins: [
        // Since some NodeJS modules expect to be running in Node, it is helpful
        // to set this environment var to avoid reference errors.
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ],
};