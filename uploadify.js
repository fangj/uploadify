var multer = require('multer'); // v1.0.5
var path=require('path');
var fs = require('fs-extra');
var ecstatic = require('ecstatic');
var connect = require('connect')

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
	  	// console.log("fname",fname);
	    cb(null, fname);
	  }
	})
 
	var upload = multer({ storage: storage })

	app.use(ecstatic({ root:upload_path,showdir : true,baseDir:'/uploads',gzip:true}));

	app.post('/upload', upload.array('files'), function (req, res, next) {
		if(!req.files.length){
			return res.status(404).json({err:"no uploaded file"});
		}
		var filenames=req.files.map(file=>"/uploads/"+file.filename);
	  	res.json({urls:filenames});
	});
}

// module.exports=uploadify;



function a (req, res, next) {
  console.log('a')
  next()
}

function b (req, res, next) {
  console.log('b')
  next()
}

const series = require('middleware-series');

var combinedMiddleware = function(mws) {
  var chain = connect();
  mws.forEach(function(middleware) {
    chain.use(middleware);
  });
  return chain;
};

function compose(middleware) {
  return function (req, res, next) {
    connect.apply(null, middleware.concat(next.bind(null, null))).call(null, req, res)
  }
}
// module.exports=compose([a,b])
// module.exports=series(a,b)
module.exports=combinedMiddleware([a,b])
