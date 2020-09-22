var express = require('express');
var router = express.Router();
let author = require('../db/model/authorModel.js')

/* GET home page. 使用模板文件 */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('', (req, res) => {
	res.send('你好')
	// 查询star大于等于100
	// author.find({'name': '你是人间四月天1', star: {$gte: 100}})
	// author.find({'$or': [{'name': '你是人间四月天'}, {'name': '你是人间四月天1'}]})
	// let re = /人间/ig
	// author.find({name: {'$regex': re}})
	// .then((data) => {
	// 	res.send(data)
	// })
	// .catch((err) => {
	// 	res.send(err)
	// })
	//设置cookie，过期时间
	// res.cookie('login', 'true', { maxAge: '10000'})
	// 删除cookie
	// res.clearCookie('login')
	// 获取cookie
	// console.log(req.cookies.login)
	// res.send({code: 200, msg: 'ok'})
})

module.exports = router;
