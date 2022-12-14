const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: {
        bundle: path.resolve(__dirname, 'src/app.js'),
        'pdf.worker': 'pdfjs-dist/build/pdf.worker.entry.js'
    },
    output: {
      filename: '[name][contenthash].js',
      path: path.join(__dirname, 'dist'),
      clean: true,
      assetModuleFilename: '[name][ext]'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
        ]
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        port: 1943,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:'Webpack app',
            filename:'index.html',
            template: 'index.html'
        })
    ], resolve: {
        fallback: { 'path': require.resolve('path-browserify') },
        extensions: ['.jsx', '.js', '.tsx', '.ts'],
     }
}