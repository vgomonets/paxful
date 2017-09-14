const path = require("path");

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
    externals: {
        jquery: 'jQuery'
    }
};