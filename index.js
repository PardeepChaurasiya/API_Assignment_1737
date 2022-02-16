const { response } = require('express');
const express = require('express')

const con = require("./config")
 
const app = express();

app.use(express.json())
app.get("/",(req,res)=>{
    con.query("select * from users",(err,result)=>{
        if(err){
            res.send("error in api")
        }else{
            res.send(result)
        }
    })
})
app.post("/",(req,res)=>{
    const data = req.body
    con.query("INSERT INTO users SET ?",data,(err,result,feilds)=>{
        if(err) err
        res.send(result)
    })
})
app.put("/:id",(req,res)=>{
    const data =[req.body.name,req.body.password,req.body.user_type,req.params.id]
    con.query("UPDATE users SET name = ?, password=?, user_type=? where id = ?",
    data,(err,result,feilds)=>{
        if(err) err
        res.send(result)
    })
})
app.delete("/:id",(req,res)=>{
    con.query("DELETE FROM users WHERE id = "+req.params.id,(err,result,feilds)=>{
        if(err) err
        res.send(result)
    })
    
})


app.listen(5000)