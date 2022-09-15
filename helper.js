async function sum(num){
    try{
    let promise = new Promise((resolve, reject)=>{
        if(num >10){
        resolve ("Num is graeter");}
        else{
            reject ("Num is smaller");
        }
    });
        
        await promise;
        console.log("Operation is done" ,result);
        
        return promise;
    }
    catch(err){
        console.log(err,"is the err")
    }
}



module.exports = {
  x : 10,
  sum
}