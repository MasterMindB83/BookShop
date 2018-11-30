const mysql=require("mysql");
const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const server=require("http").Server(app);
const io=require('socket.io')(server);
const pool = mysql.createPool({
    connectionLimit: 1000,
    host: "localhost",
    user: "root",
    password: "admin",
    database: "bookshop"
});
var mySqlConnection;
pool.getConnection((err,connection) => {
    if(err)
        console.log(err);
    else {
        mySqlConnection=connection;
        console.log('Connection successful.')
    }
});
app.use(bodyParser.json());

app.post("/adduser",(req,res) => {
    let user=req.body;
    mySqlConnection.query("insert into users(username,name,e_mail,address,phone,password) values(?,?,?,?,?,?)",
        [user.username,user.name,user.e_mail,user.address,user.phone,user.password],(err,rows,fields) => {
            
        if(err)
            res.send(err);
        else
            res.send(rows);
    })
});

app.get("/login/:username/:password",(req,res) => {
    let user=req.params;
    mySqlConnection.query("select count(*) count from users where username=? and password=?",
        [user.username,user.password],(err,rows,fields) => {
            
        if(err)
            res.send(err);
        else
            res.send(rows);
    })
});

app.get("/users/:username",(req,res) => {
    let user=req.body;
    mySqlConnection.query("select * from users where username like ?",
        [req.params.username],(err,rows,fields) => {
            
        if(err)
            res.send(err);
        else
            res.send(rows);
    })
});
app.post("/updateuser",(req,res) => {
    let user=req.body;
    mySqlConnection.query("update users set username=?,name=?,phone=?,address=?,e_mail=?,password=? where username like ?",
        [req.body.username,req.body.name,req.body.phone,req.body.address,req.body.e_mail,req.body.password,req.body.username],(err,rows,fields) => {
            
        if(err)
            res.send(err);
        else
            res.send(rows);
    })
});
app.get("/books/:name/:genre/:index/:count",(req,res) => {
    let params=req.params;
    let sql="select x.* from (select *,@row_number:=@row_number + 1 row_number from books,(select @row_number :=0) r";
    let where = '';
    if(params.name != '-1') {
        where = "name like '%" +params.name + "%'";
    }
    if(params.genre != '-1') {
        if(where == '')
            where = "genre like '%" +params.genre + "%'";
        else
            where += " and genre like '%" +params.genre + "%'";
    }
    if(where != '')
        where = ' where ' + where;
    sql += where + ") x";
    let startIndex=(params.index-1)*params.count + 1;
    let endIndex=params.index*params.count;
    sql += " where row_number >= "+startIndex + " and row_number <= " + endIndex;
    mySqlConnection.query(sql,(err,rows,fields) => {
            
        if(err)
            res.send(err);
        else
            res.send(rows);
    })
});
app.get("/booksno/:name/:genre",(req,res) => {
    let params=req.params;
    let sql="select count(*) count from (select *,@row_number:=@row_number + 1 row_number from books,(select @row_number :=0) r";
    let where = '';
    if(params.name != '-1') {
        where = "name like '%" +params.name + "%'";
    }
    if(params.genre != '-1') {
        if(where == '')
            where = "genre like '%" +params.genre + "%'";
        else
            where += " and genre like '%" +params.genre + "%'";
    }
    if(where != '')
        where = ' where ' + where;
    sql += where + ") x";
    let startIndex=(params.index-1)*params.count + 1;
    let endIndex=params.index*params.count;
    // sql += " where row_number >= "+startIndex + " and row_number <= " + endIndex;
    mySqlConnection.query(sql,(err,rows,fields) => {
            
        if(err)
            res.send(err);
        else
            res.send(rows);
    })
});
io.on('connection',(socket) => {
    console.log('New connection made.');
    socket.on('login',(data) =>{
        socket.emit('login',data);
    });
});

app.listen(3000,(err) => {
    if(err)
        console.log(err);
    else
        console.log("Listening on port 3000.");
}); 