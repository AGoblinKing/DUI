require('./models');

var dnode = require('dnode'),
    express = require('express');
    
var app = express.createServer();
app.use(express.static(__dirname+'/client'));
app.listen(process.env.C9_PORT);

var group = new Collection({
   items: [new Entity()]
});

var server = dnode(group.client);

server.listen(app);

