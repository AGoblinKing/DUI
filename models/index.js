require('../lib/def');
var fs = require('fs');

var files = fs.readdirSync(__dirname);
_(files).each(function(val) {
    if(val != 'index.js') {
        require(__dirname+'/'+val);
    }
});