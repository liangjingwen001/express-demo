let mongoose = require('mongoose');

let newsSchema = new mongoose.Schema({
	title: 'string', 
	author: 'string',
	content: 'string',
	date: 'string'
	});
	
let news = mongoose.model('news', newsSchema);

module.exports = news;