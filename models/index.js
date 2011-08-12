require('../lib/base');

var fs = require('fs');

fs.readdir('.', function(err, files) {
    _(files).each(function(val) {
         var tmp = require('./'+val);
         _(tmp).each(function(val, key) {
             global[key] = val;
         });
    });
});