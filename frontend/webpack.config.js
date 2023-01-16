// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV == 'production';


const config = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        open: true,
        host: 'localhost'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.FRONTEND_API_URL': JSON.stringify(process.env.FRONTEND_API_URL)
        })
    ],
    module: {
        rules: [
            {
                test: /\.m?jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(eot|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset'
            },
            {
                test: /\.svg$/i,
                use: ['@svgr/webpack']
            }
        ],
    },
    resolve: {
        extensions: ['.jsx', '.js']
    }
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }

    return config;
};
