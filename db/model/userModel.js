let connection = require('../connection')

var sql = 'SELECT * FROM user';
var userList = " ";
connection.query(sql, (err,result) => {
    if(err){
        console.log('[SELECT ERROR]:',err.message);
    }
    userList = JSON.stringify(result);
});

module.exports = userList

