const helper = require("./helper");
const express= require("express");
const  bodyParser = require("body-parser");
const https = require("https");
const mysql= require("mysql");
const { resolve } = require("path");
const { rejects } = require("assert");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.get("/",(req,res)=>{
    

    var mysql      = require('mysql');
    var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'apple',
    database : 'bestBuy'
     });
     connection.connect();
     async function checkNum(){
        let promise = new Promise((resolve,reject)=>{
            connection.query("SELECT COUNT(*) as 'c' FROM sku" , (err, result)=>{
                resolve (JSON.stringify(result[0].c));
            });
        });
        await promise;
        console.log("calculation is done");
        return promise;
    }
    
    let w = checkNum().then((result)=>{
        
        res.render("index" , {val : result});
    });


    
});

app.post("/",(req,res)=>{
    res.redirect("/");

    let entry = [[req.body.sku]];
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'apple',
    database : 'bestBuy'
     });
     connection.connect();
     
     async function checkq(){
       let promise =  new Promise((resolve ,reject) =>{
         connection.query(helper.q ,[entry],(err , result)=>{
               resolve (JSON.stringify(result)); 
               console.log("calculating");
         
      
          } );
       
       });

       await promise;
       console.log("Done");
       return promise;
     
     } 

     

      checkq().then((result)=>{
       console.log(result);
     });
 

})

app.get("/count" , (req,res)=>{

let q = "SELECT num AS 'num' FROM sku WHERE num > 100 ORDER BY num DESC LIMIT 4";


let entry = [[req.body.sku]];
var mysql      = require('mysql');
var connection = mysql.createConnection({
host     : 'localhost',
user     : 'root',
password : 'apple',
database : 'bestBuy'
 });
 connection.connect();

 async function cal(){
    let promise = new Promise((resolve, reject)=>{
        connection.query(q,(err ,result)=>{
            if(err) console.log(err);
            else{
                resolve(JSON.stringify(result[0].num));
            }

        })
    });

    await promise;
    console.log("query has ran");
    return promise;
 }
 
cal().then((result)=>{
    res.send(result);
    console.log(result);
})
  

});

app.get("/search" , (req,res)=>{
    res.render("search");
});

app.post("/search",(req,res)=>{
 let q = "SELECT  * FROM sku WHERE num = ?";
let entry =req.body.sku;
console.log(entry);
var mysql      = require('mysql');
var connection = mysql.createConnection({
host     : 'localhost',
user     : 'root',
password : 'apple',
database : 'bestBuy'
 });
 connection.connect();
async function search(){
    const promise = await new Promise((resolve,reject)=>{
    connection.query(q,entry , (err, result)=>{
        if(err) {console.log(err);
        
        }
        else{
        resolve(JSON.stringify(result[0].created_at));
        
    }
    })

    });
    
    // let go= {
    //     id : promise.num,
    //     dt : promise.created_at
    // }
    console.log("Search is don! " );
    console.log(promise);
    return (promise);
}

    search().then((result)=>{
        
        
            console.log("Result in console is "+result);
        res.render("search" , {s : result});
    
    })

})

app.listen(3000, (err)=>{
    if(err) console.log(err);
    else console.log('Running server at port 3000');
})