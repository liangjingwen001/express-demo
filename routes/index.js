var express = require('express');
var router = express.Router();
let connection = require('../db/connection')

router.get('', (req, res) => {
	var sql = 'SELECT * FROM user where age = 18';
	var userList = " ";
	connection.query(sql, (err,result) => {
		if(err){
			console.log('[SELECT ERROR]:',err.message);
		}
		userList = JSON.parse(JSON.stringify(result));
		res.send(userList)
	});
})

module.exports = router;
