_ = require('underscore');
var moduleParser = function (row) {
  var blacklisted_props = ["parse", "_typeCast"];
  var result = {};
  for(var p in row) {
    if(_.indexOf(blacklisted_props, p) == -1) {
      result[p] = row[p];
    }
  }
  return result;
};

module.exports.moduleParser = moduleParser;