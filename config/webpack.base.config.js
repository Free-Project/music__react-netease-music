import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import TerserPlugin from 'terser-webpack-plugin';

const rootPath = process.cwd();

export default (env, argv) => {
  const isProd = argv.mode === 'production';

  const config = {
    entry: path.resolve(rootPath, 'src/index.tsx'),
    output: {
      // 因为开发环境中，chunkhash与HotModuleReplacementPlugin有冲突，所以两个环境分别设置
      filename: isProd ? '[name].[chunkhash:8].js' : '[name].[fullhash:8].js',
      path: path.resolve(rootPath, 'dist'),
      publicPath: '/',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      modules: [path.resolve(rootPath, 'src'), 'node_modules'],
      alias: {},
    },
    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
          include: /node_modules/,
        },
        {
          test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[name].[hash:8].[ext]',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': '{}',
        __LOCALHOST__: process.env.LOCAL === 'true',
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(rootPath, 'src/index.html'),
        favicon: path.resolve(rootPath, 'favicon.ico'),
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css',
      }),
      // new BundleAnalyzerPlugin(),
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
        }),
      ],
    },
  };
  return config;
};
