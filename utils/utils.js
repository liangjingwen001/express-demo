const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken') // npm i jsonwebtoken -s
const svgCaptcha = require('svg-captcha');
let screat = 'gjhgashdgajsk'
let expirationDate = 1000 * 60 * 10 // 设置过期时间

// 发送验证码
function email(mailbox, code) {
	let transporter = nodemailer.createTransport({
		host: "smtp.qq.com",
		port: 465,
		secure: true,
		auth: {
			user: '1591998442@qq.com',
			pass: 'mjgqqutixrolhbfb'
		},
		tls: {rejectUnauthorized: false}
	});
	let info = {
		from: '1591998442@qq.com',
		to: mailbox,
		subject: '验证码',
		text: `验证码是${code},有效期5分钟`
	}
	return new Promise((resolve, reject) => {
		transporter.sendMail(info, (err, data) => {
			if (!err) {
				reject({code: 200, msg: '验证码发送成功'})
			} else {
				console.log(err)
				resolve({code: 1002, msg: '验证码发送失败'})
			}
		})
	})
}

// 创建token
function createToken(info) {
    info.createTime = Date.now();
    return jwt.sign(info, screat)
}

// 检查token
function checkToken(token) {
    let nowTime = Date.now();
    return new Promise((resolve, reject) => {
        jwt.verify(token, screat, (err, data) => {
            if (err) {
                reject({code: 401, msg: 'token 验证失败'})
            } else if (data.createTime + expirationDate < nowTime) {
                reject({code: 401, msg: 'token 已过期'})
            } else {
                resolve(data)
            }
        })
    })
}

// 根据token获取用户信息
function getUserInfo(token) {
	let userInfo
	jwt.verify(token, screat, (err, data) => {
		if (!err) {
			userInfo = data
		}
	})
	return userInfo
}

//图片验证码

function getCode (req, res, next) {
    var codeConfig = {
        size: 4,// 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 2, // 干扰线条的数量
        height: 44
    }
    var captcha = svgCaptcha.create(codeConfig);
    // req.session.captcha = captcha.text.toLowerCase(); //存session用于验证接口获取文字码
	res.cookie('captcha', req.session); 
	res.setHeader('Content-Type', 'image/svg+xml');
	res.write(String(captcha.data));
	res.end();
}	


module.exports = {
	email,
	createToken,
	checkToken,
	getUserInfo,
	getCode
}