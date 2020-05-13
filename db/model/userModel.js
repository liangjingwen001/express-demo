let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
	userName: 'string', 
	passWord: 'string',
	});
	
let user = mongoose.model('users', userSchema);

module.exports = user;

