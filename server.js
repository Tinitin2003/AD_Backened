const express=require("express");
const mysql=require("mysql");
const cors=require("cors");
const app=express();

app.use(express.json());
app.use(cors({
    origin: "*",
}));
const con= mysql.createConnection({
    host: "sql6.freesqldatabase.com",
    user: "sql6588358",
    password: "btB6GzPkwa",
    database:"sql6588358"
})
app.post('/register',(req,res)=>{
    const username=req.body.username;
    console.log(username);
    const email=req.body.email;
    console.log(email);
    const password=req.body.password;
    console.log(password);
    con.query("select * from AD_User_Detail where Email=? ",[email],
        (err,result)=>{
            if(err){
                req.setEncoding({err:err});
            }else{
             if(result.length>0){
                res.send({message: "Email already in use"});
                console.log("already in use");
             }
             else{
                con.query("insert into AD_User_Detail (Name,Email,Password) values(?,?,?)",[username,email,password],
                (err,result)=>{
                    if(result){
                        res.send(result);
                    }else{
                        res.send({message: "Enter Incorrect"})
                    }
                }
            )
             }
            }
        }
    )
})
app.post('/login',(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    con.query("select * from AD_User_Detail where Email=? and Password=?",[email,password],
        (err,result)=>{
            if(err){
                req.setEncoding({err:err});
            }else{
             if(result.length>0){
                res.send(result);
             }
             else{
                res.send({message: "Wrong username or password"});
             }
            }
        }
    )
})
app.listen(3001,()=>{
    console.log("server is running");
})