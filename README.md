### uploadify

express 上传文件服务中间件

```
var uploadify= require('./uploadify');
app.use('/upload',uploadify({ root:'uploads'}));
```

其中root为文件所在目录
上传成功后会返回

```
{
	"urls": [
		"201612-考试系统-1490073226947.md",
		"201612-实验报告-1490073226951.md"
	]
}
```

其中url是相对于所在路由的url
故而完整的url是
http://localhost:3000/upload/201612-考试系统-1490073226947.md