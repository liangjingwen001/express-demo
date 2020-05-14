var express = require('express');
var router = express.Router();
let fs = require('fs');

/* 上传图片接口 */
router.post('/uploadImg', function(req, res) {
  let {img} = req.body;
  let time = new Date().getTime();
  if (img) {
	  fs.writeFile(`./public/images/${time}.png`, img, 'base64', (err) => {
	    if (!err) {
			res.send({code: 200, msg: '上传成功'})
		} else {
			res.send({code: 1001, msg: '上传失败'})
		}
	  });
  }
});

/* 下载图片接口 */
router.get('/getImg', function(req, res) {
  fs.readFile('./public/images/3.png', 'base64', (err, data) => {
	  if (!err) {
		  // res.set('Content-Type','image/jpeg')
		  res.send({code: 200, data: data})
	  }
  })
  
  // let imgData;
  // let rs = fs.createReadStream('D:/workspace/test/express-demo/public/images/3.png')
  // rs.on("data", (data) => {
	 //  imgData += data;
	 //  console.log(data)
  // })
  // rs.once("close", () => {
	 //  console.log('可写流关闭')
	 //  res.send(imgData)
  // })
  // rs.once("open", () => {
  // 	  console.log('可写流打开')
  // })
});

module.exports = router;