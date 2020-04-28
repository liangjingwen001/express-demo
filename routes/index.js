var express = require('express');
var router = express.Router();

/* GET home page. 使用模板文件 */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('', (req, res) => {
	//设置cookie，过期时间
	res.cookie('login', 'true', { maxAge: '10000'})
	// 删除cookie
	// res.clearCookie('login')
	// 获取cookie
	console.log(req.cookies.login)
	res.send({code: 200, msg: 'ok'})
})

module.exports = router;
