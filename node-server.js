const mysql=require("mysql");
const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const http=require("http");
const mySqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "bookshop"
});
app.use(bodyParser.json());
mySqlConnection.connect((err) => {
    if(err)
        console.log(err);
    else
        console.log("Connection successful.");
});

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



app.listen(3000,(err) => {
    if(err)
        console.log(err);
    else
        console.log("Listening on port 3000.");
}); 