var path=require('path');
var express = require('express');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

var uploadify=require('./uploadify');
uploadify(app,'uploads');

port="3000";
app.listen(port);
console.log("listen on "+port)