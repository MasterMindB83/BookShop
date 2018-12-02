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
    mySqlConnection.query("insert into users(username,name,e_mail,address,phone,password,city) values(?,?,?,?,?,?,?)",
        [user.username,user.name,user.e_mail,user.address,user.phone,user.password,user.city],(err,rows,fields) => {
            
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
app.get("/cartbook/:username/:book",(req,res) => {
    let params=req.params;
    mySqlConnection.query("select count(*) count from korpa where user=? and book=?",
        [params.username,params.book],(err,rows,fields) => {
            
        if(err)
            res.send(err);
        else
            res.send(rows);
    })
});
app.get("/wishlistbook/:username/:book",(req,res) => {
    let params=req.params;
    mySqlConnection.query("select count(*) count from lista_zelja where user=? and book=?",
        [params.username,params.book],(err,rows,fields) => {
            
        if(err)
            res.send(err);
        else
            res.send(rows);
    });
});
app.post("/addtowishlist",(req,res)=>{
    let params=req.body;
    console.log('test');
    mySqlConnection.query("insert into lista_zelja (user, book, kolicina) values(?,?,1)",
        [params.user,params.book],(err,rows,fields) => {
            
        if(err)
            res.send(err);
        else
            res.send(rows);
    });
});
app.delete("/deletecartbook/:username/:book",(req,res) => {
    let params=req.params;
    mySqlConnection.query("delete from korpa where user=? and book=?",
        [params.username,params.book],(err,rows,fields) => {
            
        if(err)
            res.send(err);
        else
            res.send(rows);
    })
});
app.post("/updatecart",(req,res) => {
    let params=req.body;
    mySqlConnection.query("update korpa set kolicina=? where user=? and book=?",
        [params.kolicina,params.username,params.book],(err,rows,fields) => {
            
        if(err)
            console.log(err);
        else
            res.send(rows);
    })
});
app.get("/deletefromwishlist/:user/:book",(req,res) => {
    let params=req.params;
    mySqlConnection.query("delete from lista_zelja where user=? and book=?",
        [params.user,params.book],(err,rows,fields) => {
            
        if(err)
            console.log(err);
        else
            res.send(rows);
    })
});
app.post("/updatewishlist",(req,res) => {
    let params=req.body;
    mySqlConnection.query("update korpa set kolicina=? where user=? and book=?",
        [params.kolicina,params.username,params.book],(err,rows,fields) => {
            
        if(err)
            console.log(err);
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
    mySqlConnection.query("update users set username=?,name=?,phone=?,address=?,e_mail=?,password=?, city=? where username like ?",
        [req.body.username,req.body.name,req.body.phone,req.body.address,req.body.e_mail,req.body.password,req.body.city,req.body.username],(err,rows,fields) => {
            
        if(err)
            res.send(err);
        else
            res.send(rows);
    })
});
app.get("/carttotal/:username",(req,res) => {
    let params=req.params;
    if(params.username === '-1') {
        res.send({total: 0, kolicina: 0})
    } else {
        mySqlConnection.query("select sum(ifnull(b.discount,b.price)*k.kolicina) total, sum(k.kolicina) kolicina from korpa k, books b where k.book=b.id and k.user=?",
            [params.username],(err,rows,fields) => {
                
            if(err)
                res.send(err);
            else
                res.send(rows);
        });
    }
});
app.get("/wishlisttotal/:username",(req,res) => {
    let params=req.params;
    if(params.username === '-1') {
        res.send({total: 0, kolicina: 0})
    } else {
        mySqlConnection.query("select ifnull(sum(ifnull(b.discount,b.price)),0) total, ifnull(sum(k.kolicina),0) kolicina from lista_zelja k, books b where k.book=b.id and k.user=?",
            [params.username],(err,rows,fields) => {
                
            if(err)
                res.send(err);
            else
                res.send(rows);
        });
    }
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
app.get("/books/:id",(req,res) => {
    let params=req.params;
    let sql="select * from books where id=?";
    
    mySqlConnection.query(sql,[params.id],(err,rows,fields) => {
            
        if(err)
            res.send(err);
        else
            res.send(rows);
    })
});
app.get("/korpa/:username",(req,res) => {
    let params=req.params;
    let sql="select b.*, k.kolicina, k.kolicina*ifnull(b.discount,b.price) total from books b, korpa k where b.id=k.book and k.user=?";
    
    mySqlConnection.query(sql,[params.username],(err,rows,fields) => {
            
        if(err)
            res.send(err);
        else
            res.send(rows);
    })
});
app.get("/listazelja/:username",(req,res) => {
    let params=req.params;
    let sql="select b.*, k.kolicina, k.kolicina*ifnull(b.discount,b.price) total from books b, lista_zelja k where b.id=k.book and k.user=?";
    
    mySqlConnection.query(sql,[params.username],(err,rows,fields) => {
            
        if(err)
            res.send(err);
        else
            res.send(rows);
    });
});
app.post("/movetolistazelja",(req,res) => {
    let params=req.body;
    let sql="select * from korpa where user=? and book=?";
    let sql2="insert into lista_zelja(user,book,kolicina) values(?,?,?)";
    let sql3="delete from korpa where user=? and book=?"
    
    mySqlConnection.query(sql,[params.username,params.id],(err,rows,fields) => {
            
        if(err)
            res.send(err);
        else  {
            let kolicina = rows[0].kolicina;
            mySqlConnection.query(sql2,[params.username,params.id,kolicina],(err,rows,fields) =>{
                if(err)
                    console.log(err);
                else {
                    mySqlConnection.query(sql3,[params.username,params.id],(err,rows,fields) =>{
                        if(err)
                            console.log(err);
                        else {
                                console.log('Book move to wishlist.');
                                res.send(rows);
                            }
                    });
                }
            });
        }
    });
});
app.post('/addtocart',(req,res)=>{
    let params=req.body;
    let sql = "insert into korpa (user,book, kolicina) values(?,?,?)";
    mySqlConnection.query(sql,[params.username,params.book,params.kolicina],(err,rows,fields) => {
            
        if(err)
            res.send(err);
        else
            res.send(rows);
    })
});
app.get('/cart/:user',(req,res)=>{
    let params=req.params;
    let sql = "select * from korpa where user=?";
    mySqlConnection.query(sql,[params.user],(err,rows,fields) => {
            
        if(err)
            res.send(err);
        else
            res.send(rows);
    })
});
app.get('/discount',(req,res)=>{
    let params=req.params;
    let sql = "select * from quantity_discount";
    mySqlConnection.query(sql,(err,rows,fields) => {
            
        if(err)
            res.send(err);
        else
            res.send(rows);
    })
});
app.post("/movetokorpa",(req,res) => {
    let params=req.body;
    let sql="select * from lista_zelja where user=? and book=?";
    let sql2="insert into korpa(user,book,kolicina) values(?,?,?)";
    let sql3="delete from lista_zelja where user=? and book=?"
    
    mySqlConnection.query(sql,[params.username,params.id],(err,rows,fields) => {
            
        if(err)
            res.send(err);
        else  {
            console.log('user:' +params.username + ' book:'+params.id);
            let kolicina = rows[0].kolicina;
            mySqlConnection.query(sql2,[params.username,params.id,kolicina],(err,rows,fields) =>{
                if(err)
                    console.log(err);
                else {
                    mySqlConnection.query(sql3,[params.username,params.id],(err,rows,fields) =>{
                        if(err)
                            console.log(err);
                        else 
                        {
                            console.log('Book move to cart.');
                            res.send(rows);
                        }
                    });
                }
            });
        }
    });
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