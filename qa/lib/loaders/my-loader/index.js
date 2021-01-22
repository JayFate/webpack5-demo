module.exports = function entryLoader(_, map, meta) {
  this.addContextDependency(this.projectRoot);
  this.callback(null, '' , map, meta);
};
