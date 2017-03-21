var multer = require('multer'); // v1.0.5
var path=require('path');
var fs = require('fs-extra');
var ecstatic = require('ecstatic');
var express = require('express');


function makeFileName(originalname){
	var extname=path.extname(originalname);
	var basename=path.basename(originalname,extname);
	return basename + '-' + Date.now()+extname; //暂时使用日期保证不重名
}

function uploadify(opts){
	var router = express.Router();

	var upload_path=opts.root;
	fs.ensureDirSync(upload_path);

	var storage = multer.diskStorage({
	  destination: function (req, file, cb) {
	    cb(null,upload_path)
	  },
	  filename: function (req, file, cb) {
	  	var fname=makeFileName(file.originalname);
	  	// console.log("fname",fname);
	    cb(null, fname);
	  }
	})
 
	var upload = multer({ storage: storage })
	router.post('/',upload.array('files'), function (req, res, next) {
		if(!req.files.length){
			return res.status(404).json({urls:[]});
		}
		var filenames=req.files.map(file=>file.filename);
	  	res.status(200).json({urls:filenames});
	});
	router.get('/', function (req, res, next){
		res.sendFile(path.join(__dirname,'upload.html'));
	})
	router.use(express.static(upload_path));

	return router;
}

module.exports=uploadify;
