const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = {
    mode: 'production',
    entry: {
        main: ['./resources/assets/js/main.js', './resources/assets/sass/main.scss']
    },
    module: {
        rules: [
            {
                test: /\.(s(a|c)ss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [new MiniCssExtractPlugin({
        filename: "./css/[name]-[hash].css"
    }),
    new WebpackAssetsManifest({
        output: "./manifest.json"
    })
    ],
    optimization: {
        minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
        minimize: true
    },
    output: {
        path: path.resolve(__dirname, './public'),
        filename: './js/[name]-[hash].js',
        chunkFilename: '[id]-[chunkhash].js',
        clean: true
    },
};