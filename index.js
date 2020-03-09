const express = require('express');
const pool = require("./pool.js");

let port = 5050; // 新浪云中的NodeJS只支持5050端口
let app = express();

app.listen(port, ()=>{
    console.log('Server is Listening:', port);
});
app.use(express.static('static'));

app.get('/user', (req, res)=>{
    pool.query('SELECT * FROM xz_user',(err, result)=>{
        if (err) throw err;
        // 来自任何客户端都允许访问
        res.set('Access-Control-Allow-Origin', "*");
        res.json(result);
    });

});
app.get('/login/:uname&:upwd',function(req,res){
	var $uname=req.params.uname;
	var $upwd=req.params.upwd;
	console.log($uname,$upwd);
	pool.query("select * from xz_user where uname=? and upwd=?",[$uname,$upwd],function(err,result){
		
		if(err) throw err;
		if(result.length>0){
			res.send("suc");
		}else{
			res.send("err");
		}
	});
});
app.get('/userlist',function(req,res){
	pool.query("select * from xz_user",function(err,result){
		if(err) throw err;
		console.log(result);
		res.send(result);
	});
});

