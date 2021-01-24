const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require('copy-webpack-plugin')
const DependencyGraphPlugin = require("../plugins/my-plugin");

module.exports = async function genWebpackConfig(options) {
  const CWD = process.cwd();
  const { cwd = CWD } = options;
  const root = cwd;
  const BUILD_DIR = path.resolve(cwd, ".quickapp/build");
  const mode = "development";
  const dependencyGraphPlugin = new DependencyGraphPlugin(root);
  const fileExtList = [
    'png'
  ].join('|')
  let config = {
    context: root,
    mode,
    cache: false,
    entry: {
      "app.js":
        path.resolve(root, 'app.json?main'),
    },
    target: "web",
    output: {
      publicPath: "/",
      path: BUILD_DIR,
    },
    module: {
      rules: [
        {
          test: path.resolve(root, "app.json"),
          type: "javascript/auto",
          use: require.resolve("../loaders/my-loader"),
        },
      ],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: `**/*.@(${fileExtList})`,
            to: BUILD_DIR,
            context: root,
            globOptions: {
            }
          }
        ]
      }),
      new webpack.LoaderOptionsPlugin({
        projectRoot: cwd,
        appRoot: root,
      }),
      dependencyGraphPlugin,
    ],
    watch: true,
  };
  return config;
};
