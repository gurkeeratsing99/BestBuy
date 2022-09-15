const helper = require("./helper");
const express= require("express");
const  bodyParser = reqiore("body-parser");
const https = reqiore("https");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.listen(3000, (err)=>{
    if(err) console.log(err);
    else console.log('Running server at port 3000');
})