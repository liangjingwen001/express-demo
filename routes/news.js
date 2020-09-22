var express = require('express');
var router = express.Router();
let fs = require('fs');
let utils = require('../utils/utils.js')
let news = require('../db/model/news.js')

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
router.post('/getImg', function(req, res) {
  fs.readFile('./public/images/3.png', 'base64', (err, data) => {
	  if (!err) {
		  // res.set('Content-Type','image/jpeg')
		  res.status(200).send({code: 200, data: data})
	  }
  })
  
  // let imgData;
  // let rs = fs.createReadStream('D:/workspace/test/express-demo/public/images/4.png')
  // rs.on("data", (data) => {
	 //  imgData += data;
	 //  console.log('数据来了'+ data.length)
  // })
  // rs.once("close", () => {
	 //  console.log('可写流close')
	 //  res.set('Content-Type','image/jpeg')
	 //  res.status(200).send({code: 200, data: imgData})
  // })
  // rs.once("open", () => {
  // 	  console.log('可写流打开')
  // })
  // rs.once("end", () => {
  // 	  console.log('可写流end')
  // })
  
});

/* 新增编辑新闻接口 */
router.post('/addNews', function(req, res) {
	let {userName} = utils.getUserInfo(req.headers.token)
	let {title, content, _id} = req.body;
	if (title && content) {
		let date = new Date()
		if (_id) {
			// 编辑接口
			console.log(_id)
			news.update({_id}, {title, content, date, author: userName})
			.then((data) => {
				res.send({code: 200, msg: '编辑成功'})
			})
			.catch((err) => {
				res.send({code: 1002, msg: '编辑失败'})
			})
		} else {
			// 新增接口
			news.insertMany({title, content, date, author: userName})
			.then((data) => {
				res.send({code: 200, msg: '新增成功'})
			})
			.catch((err) => {
				res.send({code: 1002, msg: '新增失败'})
			})
		}
	} else {
		res.send({code: 1001, msg: '缺少参数'})
	}
});

/* 查询新闻接口 */
router.get('/selectNews', function(req, res) {
	news.find({})
	.then((data) => {
		res.send({code: 200, data: data})
	})
	.catch((err) => {
		res.send({code: 1001, msg: '查询失败'})
	})
});

/* 删除新闻接口 */
router.post('/delNews', function(req, res) {
	let {_id} = req.body;
	console.log(_id)
	news.remove({_id})
	.then((data) => {
		res.send({code: 200, msg: '删除成功'})
	})
	.catch((err) => {
		res.send({code: 1001, msg: '删除失败'})
	})
});

/* 查询新闻详情接口 */
router.post('/newsDetail', function(req, res) {
	let {_id} = req.body;
	news.find({_id})
	.then((data) => {
		res.send({code: 200, data: data})
	})
	.catch((err) => {
		res.send({code: 1001, msg: '查询失败'})
	})
});

/* 添加新闻接口 */
router.post('/editNews', function(req, res) {
  let {_id, title, author, newsContent} = req.body;
  if (title && author && newsContent) {
	  news.update({_id}, {title, author, newsContent})
	  .then((data) => {
		  res.send({code: 200, msg: '编辑成功'})
	  })
	  .catch((err) => {
		  res.send({code: 1002, msg: '编辑失败'})
	  })
  } else {
	  res.send({code: 1001, msg: '缺少参数'})
  }
});

/* 下载文件接口 */
router.post('/downloadFile', function(req, res) {
	res.download("public/file/file2.xls");
	// res.download("public/images/1.png");
});

module.exports = router;