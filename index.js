require('./models');

var dnode = require('dnode'),
    express = require('express');
    
var app = express.createServer();
app.use(express.static(__dirname+'/clients'));
app.listen(process.env.C9_PORT);

var group = new DUI.Collection({
   items: [new DUI.Entity()]
});

for(var x=0;x<20;x++){
    for(var y=0;y<20;y++){
        group.add(new DUI.Entity({x:x, y:y}));
    }
}
var server = dnode(group.client());
server.listen(app);