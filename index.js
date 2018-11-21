var loaderUtils = require('loader-utils')
var path = require("path")

module.exports = function(content) {
  var options =  loaderUtils.getOptions(this) || {};
  
  if (options.map) {
    for (var i=0,len=options.map.length; i<len; i++) {
      var item = options.map[i];
      if (item['test'].test(this.resourcePath)) {
        if (item['import'])
          content = item['import'] + ';\n' + content;
        if (item['exports'])
          content += '\nmodule.exports = ' + item['exports'];
        if (item['window'])
          content += '\nwindow.' + item['window'] + ' = module.exports';
      }
    }
  }
  
  var fallback = options.fallback;
  if (fallback)
    return require(fallback).call(this, content);
  else
    return content;
};
