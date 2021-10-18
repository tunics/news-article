const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/client/index.js",
    mode: "development",
    devServer: {
        static: "./dist",
        port: 9000,
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.bundle.js",
        libraryTarget: "var",
        library: "Client",
        // publicPath: "./dist", // instead of publicPath: '/build/'
    },
    module: {
        rules: [
            {
                // prettier-ignore
                test: "/\.js$/",
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
    ],
};
