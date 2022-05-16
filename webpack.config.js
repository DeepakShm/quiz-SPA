const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode:'production',
    entry: {
        main : path.resolve(__dirname,'src/index.js')
    },   
    output: {
        path : path.resolve(__dirname,'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename:'assets/[name][ext]',
        clean:true,
    },
    devtool:'source-map', 
    devServer:{
        static:{
            directory: path.resolve(__dirname,'dist'),
        },
        port:4000,
        open:true,
        hot:true,
        compress:true,
        historyApiFallback:true,
    },
    module:{
        rules:[
            {
                test:/\.scss$/,
                use:['style-loader','css-loader','sass-loader']
            },
            {
                test:/\.(png|svg|jpg|jpeg|gif)$/i,
                type:'asset/resource',
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            title: 'Quiz SPA',
            filename: 'index.html',
            template: path.resolve(__dirname,'src/index.html')
        }),
    ]
}