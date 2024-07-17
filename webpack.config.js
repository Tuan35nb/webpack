// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// module.exports = {
//   entry: "./src/index.js", // Dẫn tới file index.js ta đã tạo
//   output: {
//     path: path.join(__dirname, "/build"), // Thư mục chứa file được build ra
//     filename: "bundle.js" // Tên file được build ra
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/, // Sẽ sử dụng babel-loader cho những file .js
//         exclude: /node_modules/, // Loại trừ thư mục node_modules
//         use: ["babel-loader"]
//       },
//       {
//         test: /\.css$/, // Sử dụng style-loader, css-loader cho file .css
//         use: ["style-loader", "css-loader"]
//       }
//     ]
//   },
//   // Chứa các plugins sẽ cài đặt trong tương lai
//   plugins: [
//     new HtmlWebpackPlugin({
//         template: "./public/index.html"
//       })
//   ]
// };

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};

