var packageJSON = require("./package.json")
var path = require("path")
var webpack = require("webpack")

const PATHS = {
  build: path.join(
      __dirname,
      "target",
      "classes",
      "META-INF",
      "resources",
      "webjars",
      packageJSON.name,
      packageJSON.version,
  ),
}

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader","css-loader"],
      },
      {
        test: /\.(png|jpg|svg)/,
        loader: 'file-loader',
        options: {
          name: 'static/img/[name].[ext]'
        },
      }
    ],
  },
  entry: {
    mapController: "./covidLore/js/controller/mapController.js",
    newsController: "./covidLore/js/controller/newsController.js",
    forumController: "./covidLore/js/controller/forumController.js",
    discussionController: "./covidLore/js/controller/discussionController.js",
  },
  output: {
    filename: '[name].js',
    path: PATHS.build,
    publicPath: '/'
  },
  devServer: {
    publicPath: "/",
    contentBase: path.join(__dirname, 'public')
  }
}