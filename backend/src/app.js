const express=require('express');
const app=express();
const port=3000;
const path=require("path");

// connecting all the files and folders to app.js
app.use(express.static(path.join(__dirname,"../public")));
app.use(express.static(path.join(__dirname,"./databases")));
app.use(express.static(path.join(__dirname,"./jsFiles")));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname+"../../public/html/index.html"));
})
app.get("/signUp",(req,res)=>{
    res.sendFile(path.join(__dirname+"../../public/html/signUp.html"));
})
app.get("/forgotPassword",(req,res)=>{
    res.sendFile(path.join(__dirname+"../../public/html/forgotPassword.html"));
})
app.get("/home",(req,res)=>{
    res.sendFile(path.join(__dirname+"../../public/html/home.html"));
})

let serverOtp=0;
app.post("/email",async (req,res)=>{
    console.log(req.body.value);
    const sendMail=require("./jsFiles/mailSender");
    await sendMail(req.body.value).then(data=>{
        serverOtp=data;
        res.send({success:true});
        setTimeout(()=>{
            serverOtp=null;
            console.log("OTP expired");
            res.send({success:false});
        },300000);
        console.log(serverOtp);
    }).catch(err=>{
        res.send({success:false});
    })
});
let matched=false;
app.post("/otp",async (req,res)=>{
    let clientOtp=req.body.value;
    console.log(clientOtp);
    if(clientOtp===serverOtp && clientOtp>99999 && clientOtp<=999999){
        matched=true;
        res.send({success:true});
    }else{
        matched=false;
        console.log("Enter valid otp");
        res.send({success:false});
    }
});
app.post('/signUp',(req,res)=>{
    const signUp=require("./jsFiles/signUp");
    if(matched==true) signUp(req,res);
    else res.send("Varify your email id");
});
app.post('/logIn',(req,res)=>{
    const login=require("./jsFiles/login");
    login(req,res);
});

app.post('/forgotPassword',(req,res)=>{
    const forgotPassword=require("./jsFiles/forgotPassword");
    forgotPassword(req,res);
})



app.listen(port,()=>{
    console.log(`http://localhost:${port}/`);
})