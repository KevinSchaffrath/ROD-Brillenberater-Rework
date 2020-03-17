const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const TerserJs = require('terser-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const webpack = require('webpack');
const portfinder = require('portfinder');
const outputDirectory = 'dist';

module.exports = async (env, argv) => ({
    entry: './src/main.jsx',
    output: {
        path: path.join(__dirname, outputDirectory),
        filename: 'main.js'
    },
    resolve: {
        alias: {
            Fonts: path.resolve(__dirname, 'src/assets/fonts'),
            Images: path.resolve(__dirname, 'src/assets/img'),
            Icons: path.resolve(__dirname, 'src/assets/icons'),
            Downloads: path.resolve(__dirname, 'src/assets/downloads'),
            Screens: path.resolve(__dirname, 'src/screens'),
            Components: path.resolve(__dirname, 'src/components'),
            Utils: path.resolve(__dirname, 'src/utils'),
            Theme: path.resolve(__dirname, 'src/theme'),
            Stores: path.resolve(__dirname, 'src/stores')
        },
        extensions: [
            '.js',
            '.jsx',
            '.png',
            '.jpeg',
            '.jpg',
            '.json'
        ]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {loader: 'babel-loader'}
            },
            {
                test: /\.(gif|png|jpg|woff|woff2|eot|ttf|svg)$/,
                loader: 'file-loader?name=[path][name].[ext]'
            },
            {
                test: /\.pdf$/,
                use: 'file-loader?name=[path][name].[ext]'
            }
        ]
    },
    devServer: {
        port: await getPort(),
        host: '127.0.0.1',
        open: true,
        disableHostCheck: true
    },
    devtool: 'source-map',
    optimization: {
        runtimeChunk: 'single',
        minimizer: [new TerserJs({
            test: /\.js(\?.*)?$/i,
            parallel: true,
            sourceMap: true,
            terserOptions: {
                warnings: false,
                ie11: false,
                mangle: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                deadCode: true,
                evaluate: true,
                ifReturn: true,
                joinVars: true
            }
        })],
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `npm.${packageName.replace('@', '')}`;
                    },
                },
            },
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            favicon: './src/favicon.ico',
        }),
        new ScriptExtHtmlWebpackPlugin({defaultAttribute: 'defer'}),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(argv.mode)})
    ]
});

/**
 * Gets the nearest open port after the default Port given.
 *
 * @param {Number} [defaultPort = 4000] The Port you want to use.
 * @returns {Number} The port nearest to the one you want and that is open.
 */
async function getPort(defaultPort = 4000) {
    portfinder.basePort = defaultPort;

    return portfinder.getPortPromise();
}