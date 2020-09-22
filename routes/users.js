var express = require('express');
var router = express.Router();
let user = require('../db/model/userModel.js');
let utils = require('../utils/utils.js')
const svgCaptcha = require('svg-captcha');
let codeArr = []

/* 注册接口 */
router.post('/reg', (req, res, next) => {
  let {userName, passWord, code} = req.body;
  if (userName && passWord) {
	if(codeArr.indexOf(code) === -1) {
		res.send({code: 1002, msg: '验证码错误'});
	}
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

/*获取图片验证码*/
router.get('/getImgCode', (req, res) => {
	var codeConfig = {
        size: 4,// 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 2, // 干扰线条的数量
        height: 44
	}
	var captcha = svgCaptcha.create(codeConfig);
	codeArr.push(captcha.text.toLowerCase())
	setTimeout(() => {
		let index = codeArr.indexOf(captcha.text.toLowerCase())
		if (index > -1) {
			codeArr.splice(index, 1)
		}
	}, 90000)
	res.cookie('captcha', req.session); 
	res.setHeader('Content-Type', 'image/svg+xml');
	res.write(String(captcha.data));
	res.end();
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
