var express = require('express');
var router = express.Router();
let user = require('../db/model/userModel.js');
let utils = require('../utils/utils.js')

/* 注册接口 */
router.post('/reg', (req, res, next) => {
  let {userName, passWord} = req.body;
  if (userName && passWord) {
	 user.find({userName})
	 .then((data) => {
		 if (data.length > 0) {
			 res.send({code: 1003, msg: '用户名已存在'});
		 } else {
			user.insertMany({userName, passWord})
			.then(() => {
					 res.send({code: 200, msg: '注册成功'});
			})
			.catch(() => {
					 res.send({code: 1001, msg: '注册失败'});
			}) 
		 }
	 })
	 .catch((err) => {
		 res.send(err)
	 })
  } else {
	  res.send({code: 1002, msg: '参数不齐'});
  }
});

/*获取邮箱验证码*/
router.post('/getCode', (req, res) => {
	let {mailbox} = req.body;
	if (mailbox) {
		utils.email(mailbox, '168168')
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.send(err);
		})
		
	} else {
		res.send({code: 1001, msg: '邮箱不能为空'});
	}
})

/* 登录接口 */
router.post('/login', function(req, res, next) {
  let {userName, passWord} = req.body;
  if (userName && passWord) {
	  let token = utils.createToken({userName})
	 user.find({userName, passWord})
	 .then((data) => {
		 if (data.length > 0) {
			 res.send({code: 200, msg: '登录成功', token: token});
		 } else {
			res.send({code: 1001, msg: '登录失败'}); 
		 }
	 })
	 .catch(() => {
	 })
  } else {
	  res.send({code: 1002, msg: '请输入用户名或密码'});
  }
});

/* 测试token接口 */
router.post('/init', function(req, res, next) {
  let {token} = req.body;
  if (token) {
	  utils.checkToken(token)
	  .then((data) => {
		  res.send(data)
	  })
	  .catch((err) => {
		  res.send(err)
	  })
  } else {
	  res.send({code: 1003, msg: '缺少token'});
  }
});

module.exports = router;
