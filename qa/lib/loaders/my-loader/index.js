const path = require("path");

module.exports = function entryLoader(_, map, meta) {
  const prjConfigFile = path.resolve(this.projectRoot, "quickapp.config.json");
  this.addDependency(prjConfigFile);
  this.callback(null, '' , map, meta);
};
