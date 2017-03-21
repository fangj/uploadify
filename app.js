var path=require('path');
var express = require('express');

var app = express();

//gzip
var compression = require('compression')
app.use(compression());

/* upload middleware begin */
var uploadify= require('./uploadify');
app.use('/upload',uploadify({ root:'uploads'}));
/* upload middleware end */

//just for show result
var ecstatic = require('ecstatic');
app.use(ecstatic({ root:'uploads',baseDir:'/uploads',showdir : true,gzip:true}));

port="3000";
app.listen(port);
console.log("listen on "+port)

/*
http://localhost:3000/upload 上传
http://localhost:3000/uploads 查看
 */