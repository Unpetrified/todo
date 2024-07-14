const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/script.js', // Entry point
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, // Clean the output directory before emit
    },
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
          {
           test: /\.(png|svg|jpg|jpeg|gif)$/i,
           type: 'asset/resource',
         },
         {
           test: /\.(woff|woff2|eot|ttf|otf)$/i,
           type: 'asset/resource',
         },
        ],
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Source HTML file
            filename: 'index.html', // Output HTML file
        }),
    ],
    mode: 'development', // Use 'production' for optimized builds
};
