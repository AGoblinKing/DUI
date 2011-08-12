require('../lib/base');

var fs = require('fs');

var files = fs.readdirSync(__dirname);
_(files).each(function(val) {
    if(val != 'index.js') {
         var tmp = require(__dirname+'/'+val);
         _(tmp).each(function(val, key) {
             global[key] = val;
         });
    }
});