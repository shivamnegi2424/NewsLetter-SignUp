const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.listen(process.env.POR || 3000,function(){
    console.log("server is running fine on port 3000");
})

app.get("/",function(req,res){
    res.sendFile(__dirname +"/signUp.html");
})

app.post("/",function(req,res){
    const Name=req.body.Name;
    const Email=req.body.Email;

    const data={
        members:[{
            email_address:Email,
            status:"subscribed",
            merge_fields:{
                FNAME: Name,
                LNAME: Name
            }
        }]
    }

    const jsonData=JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/9b3374efca";
    const options={
        method:"POST",
        auth: "Shivam2:583e46eed2eaedaad33170aa9a7ddbcd-us21"
    }
    const request=https.request(url,options,function(response){
        if(response.statusCode===200)
            res.sendFile(__dirname +"/success.html");
        else{
            res.sendFile(__dirname+"/failure.html");
        }
            response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})

app.post("/failure",function(req,res){
    res.redirect("/");
})

//API 583e46eed2eaedaad33170aa9a7ddbcd-us21
//List Id 9b3374efca