### uploadify

express 上传文件服务中间件

option沿用https://github.com/jfhbrook/node-ecstatic 

var opts = {
			 route 				: '/upload',
             root               : __dirname + '/public', //上传的文件目录
             baseDir            : '/', //文件在url中的base
           }