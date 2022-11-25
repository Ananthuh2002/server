var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyparser=require("body-parser")
var cors=require("cors")


app.use(cors())

var jsonparser=bodyparser.json ()

var urlencodedparser = bodyparser.urlencoded({extended:true})


// Database connection
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "db3"
})
con.connect((err) => {
    if (err) {
        throw (err);
    }
    // console.log("connected to database");
})

// display form element from person

app.get("/api/get",(req,res)=>{

    let select="select * from person";
    con.query(select,(err,data)=>{
        res.send(data);
    })

    


})

// display list of reporting staff to admin 

app.get("/api/list/admin",(req,res)=>{

    let view="select * from list";
    con.query(view,(err,data)=>{
      res.send(data)
    })

})

// insert form data to database
app.post("/api/insert",urlencodedparser,jsonparser,(req,res)=>{
   
    let title=req.body.title;
    let find=req.body.find;
    let Totime=req.body.Totime;
    let Fromtime=req.body.Fromtime;
    let Type=req.body.Type;
    let Description=req.body.Description;
    // let status=re.body.status;

    let qr="insert into person values(?,?,?,?,?,?)";
    con.query(qr,[title,find,Totime,Fromtime,Type,Description],(err,data)=>{
        if(err){
            res.send({error:"fail"})
        }
        else{
    
            res.send({success:"completed"})
        }
       })
    
})

// add new reporting staff

app.post("/api/insert/admin",urlencodedparser,jsonparser,(req,res)=>{
   
    let fname=req.body.fname;
    let Email=req.body.Email;
    let school=req.body.school;
 
    // let status=re.body.status;

    let qr="insert into list values(?,?,?)";
    con.query(qr,[fname,Email,school],(err,data)=>{
        if(err){
            res.send({error:"fail"})
        }
        else{
    
            res.send({success:"completed"})
        }
       })
    
})


// assign reporting person
app.post("/api/insert/selist",urlencodedparser,jsonparser,(req,res)=>{

  
    let name=req.body.name;
    let email=req.body.email;
    let school=req.body.set;
 let qr="insert into selectlist values(?,?,?)";
    con.query(qr,[name,email,school],(err,data)=>{
        if(err){
            res.send({error:"fail"})
        }
        else{
    
            res.send({success:"completed"})
        }
       })
    
})

// lsit the reporting person

app.get("/api/list/report",(req,res)=>{

    let view="select * from selectlist";
    con.query(view,(err,data)=>{
      res.send(data)
    })

})






// fetch signle reporting person

app.get("/api/single:fname",(req,res)=>{
    const fname=req.params.fname;
    const qr="select * from list where fname=?";
    con.query(qr,fname,(err,result)=>{
        if(err){
      res.send(err)
        }
        else{
    
            res.send(result);
       }
       })
})

// One line added

// display the  reporting person 

//delete from form
app.delete('/api/delete/:title',(req,res)=>{
    const name=req.params.title
    const qr="delete from person where title=?";

    con.query(qr,name,(err,result)=>{
        if(err){
       console.log("fail");
        }
        else{
    
            console.log("sucess");
       }
       })
    })
    
  
// add task data


app.post("/api/insert/tasklist",urlencodedparser,jsonparser,(req,res)=>{

  
    let name=req.body.name;
    let cate=req.body.cate;
   let pri=req.body.pri;
    let des=req.body.des;
     let end=req.body.end;
    let start=req.body.start;
    let count=req.body.count;

 let qr="insert into tasklist values(?,?,?,?,?,?,?)";
    con.query(qr,[name,cate,start,end,pri,des,count],(err,data)=>{
        if(err){
            // res.send({error:"fail"})
            console.log(err);
        }
        else{
    
            console.log(data);
        }
       })
    
})

// display the list

app.get("/api/list/task",(req,res)=>{

    let view="select * from tasklist";
    con.query(view,(err,data)=>{
      res.send(data)
    })

})

// delete from list
app.delete('/api/deletelist/:Taskname',(req,res)=>{
    const name=req.params.Taskname
    const qr="delete from tasklist where Taskname=?";

    con.query(qr,name,(err,result)=>{
        if(err){
       console.log("fail");
        }
        else{
    
            console.log("sucess");
       }
       })
    })


  //update ststus of task
  app.patch("/api/taskupdate",urlencodedparser,jsonparser,(req,res)=>{
    const Stats=req.body.status;
  
    const Taskname=req.body.Taskname;
   
    const qr="update tasklist set status=? where Taskname=?";
    con.query(qr,[Stats,Taskname],(err,result)=>{
    if(err){
        res.send(err)
    }
    else{
        res.send(result)
    }
       })
})



app.listen(7000, function () {
    // console.log("server started");
})