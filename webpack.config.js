const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    historyApiFallback: true
  },
  mode: 'development',
  module: {
    rules: [
      {
        // react
        exclude: path.resolve(__dirname, 'node_modules'),
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react', 'flow'],
              plugins: [
                'transform-class-properties',
                'transform-object-rest-spread'
              ]
            }
          }
        ]
      },
      {
        // small files
        test: /\.svg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        // large files
        test: /\.(png|jpg|gif|mp3)$/,
        use: 'file-loader'
      },
      {
        // css
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
    ]
  },
  devtool: 'cheap-module-source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.ejs',
    }),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      Sound: path.resolve(__dirname, 'public/sound'),
    }
  }
};
