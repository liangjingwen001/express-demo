let mongoose = require('mongoose');

let newsSchema = new mongoose.Schema({
	title: 'string', 
	author: 'string',
	newsContent: 'string'
	});
	
let news = mongoose.model('news', newsSchema);

module.exports = news;