const path = require("path");
function DependencyGraphPlugin(root) {
  this.root = root;
  this.graph = {
    root: root,
    app: "app.js",
    pages: [],
    globalComponents: [],
    subpackages: [
      {
        root: "pkg1",
        pages: [
          {
            routekey: "pkg1/p1/p1",
            js: path.resolve(root, "pkg1/p1/p1.js"),
            template: "pkg1/p1/p1.qxml",
            stack: ["pkg1/p1/p1"],
            dependencies: [],
            type: "page",
            root: "pkg1",
          },
        ],
      },
    ],
    customTabBar: null,
    errors: [],
    warnings: [],
    nodeMap: {},
    css: path.resolve(root, "app.css"),
  };
}

DependencyGraphPlugin.prototype.apply = function apply(compiler) {
  compiler.hooks.done.tap("DependencyGraphPlugin", (compiler) => {
    compiler.compilation.errors = compiler.compilation.errors.concat([
      new Error("test error"),
    ]);
  });
};

module.exports = DependencyGraphPlugin;
