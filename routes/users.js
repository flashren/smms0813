var express = require('express');
var router = express.Router();

//1 引入mysql模块
var mysql= require('mysql');

//2 链接数据库
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'smms'
});

//3 打开数据库链接
connection.connect();

/* 添加用户的路由 */
router.post('/add', function(req, res, next) {
  //2. 后端路由接收前端的数据
  let {pass,username,region}=req.body;

  //3. 链接数据库，把数据库写入数据库
  //定义sql语句
  let sqlStr=`insert into userTable(userName,userPwd,userGroup) values('${username}','${pass}','${region}')`;
  //执行sql语句
  connection.query(sqlStr, function (error, results) {
    if (error) throw error; //出错对象
    //4. 返回处理的结果到前端
    /*
    {
      "fieldCount":0,
      "affectedRows":1, 返回受影响的行数，如果大于0就表示成功
      "insertId":1,
      "serverStatus":2,
      "warningCount":0,
      "message":"",
      "protocol41":true,
      "changedRows":0
    }
    */
    res.send(results); //执行sql语句返回的结果
  });
});

module.exports = router;
