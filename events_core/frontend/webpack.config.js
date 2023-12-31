const path = require("path")

module.exports = {
  entry: {
    app: "./src/js/index.js",
    contactForm: "./src/js/contact-form.js",
    countdown: "./src/js/countdown.js",
    charts: "./src/js/charts.js",
    darkMode: "./src/js/dark-mode.js",
    videoLightbox: "./src/js/video-lightbox.js"
  },
  mode: "development",
  devServer: {
    static: "dist",
    watchFiles: ["src/**/*"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.css$/i,
        include: [path.resolve(__dirname, "node_modules"), path.resolve(__dirname, "src/css")],
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.svg/,
        type: "asset/resource"
      }
    ]
  },
  plugins: [],
  output: {
    filename: "js/[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    assetModuleFilename: "assets/[hash][ext][query]"
  }
}
