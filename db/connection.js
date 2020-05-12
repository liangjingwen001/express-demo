let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dbDemo', {useNewUrlParser: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('db ok')
});

// let authorSchema = new mongoose.Schema({
// 	name: 'string', 
// 	author: 'string',
// 	});
	
// let author = mongoose.model('authors', authorSchema);
// 插入单条记录用对象,多条记录用数组(schema没有的对戏不会插入都数据库)
// author.insertMany([{name: '你是人间四月天1', author: '梁徽因', star: 10000}])
// .then((res) => {
// 	console.log(res)
// })
// .catch((err) => {
// 	console.log(err)
// })

//查询数据
// author.find({'_id': '5eb8b2720502ec149c5311d9'})
// .then((res) => {
// 	console.log(res)
// })
// .catch((err) => {
// 	console.log(err)
// })

// 删除数据
// author.remove({'_id': '5eb8b2720502ec149c5311d9'})
// .then((res) => {
// 	console.log(res)
// })
// .catch((err) => {
// 	console.log(err)
// })

// 更新数据
// author.update({'_id': '5eb8b48b17ba6f2d0cc2cca0'},{name: '遮天',author: '辰东'})
// .then((res) => {
// 	console.log(res)
// })
// .catch((err) => {
// 	console.log(err)
// })

//分页查询数据（第三页，每页2条）
// author.find().skip((3 - 1) * 2).limit(2)
// .then((res) => {
// 	console.log(res)
// })
// .catch((err) => {
// 	console.log(err)
// })