var express = require('express');
var multer = require('multer'); // v1.0.5
var path=require('path');
var fs = require('fs-extra');

function makeFileName(originalname){
	var extname=path.extname(originalname);
	var basename=path.basename(originalname,extname);
	return basename + '-' + Date.now()+extname;
}

function uploadify(app,upload_path){

	fs.ensureDirSync(upload_path);

	var storage = multer.diskStorage({
	  destination: function (req, file, cb) {
	    cb(null,upload_path)
	  },
	  filename: function (req, file, cb) {
	  	var fname=makeFileName(file.originalname);
	    cb(null, fname);
	  }
	})
 
	var upload = multer({ storage: storage })
	app.use('/uploads',express.static(upload_path));

	app.post('/upload', upload.array('files'), function (req, res, next) {
		var file=req.files[0];
		if(!file){
			return res.status(400).end("no file");
		}
	  	res.json({url:"/uploads/"+file.filename});
	});
}

module.exports=uploadify;
