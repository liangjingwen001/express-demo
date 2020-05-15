const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken') // npm i jsonwebtoken -s
let screat = 'gjhgashdgajsk'
let expirationDate = 1000 * 60 // 设置过期时间

// 发送验证码
function email(mailbox, code) {
	let transporter = nodemailer.createTransport({
		host: "smtp.qq.com",
		port: 465,
		secure: true,
		auth: {
			user: '1591998442@qq.com',
			pass: 'ehtmfmmfiftdidbe'
		}
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
				reject({code: 200, mas: '验证码发送成功'})
			} else {
				resolve({code: 1002, mas: '验证码发送失败'})
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

module.exports = {
	email,
	createToken,
	checkToken
}