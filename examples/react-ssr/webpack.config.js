const path = require('path');
const glob = require('glob');
const CleanObsoleteChunksPlugin = require('webpack-clean-obsolete-chunks');

module.exports = {
  entry: {
    bundle: path.join(__dirname, 'src/client/index.tsx'),
  },
  output: {
    path: path.join(__dirname, 'dist/public'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    publicPath: '/assets/',
  },
  mode: 'development',
  devtool: '#source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
  plugins: [new CleanObsoleteChunksPlugin()],
  optimization: {
    splitChunks: {
      chunks: 'initial',
      minSize: 1,
      minChunks: 1,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          enforce: true,
        },
      },
    },
    concatenateModules: true,
  },
};
