require('dotenv').config();
const express=require('express');
const app=express();
const port=process.env.PORT || 3000;
const path=require("path");

// connecting all the files and folders to app.js
app.use(express.static(path.join(__dirname,"../public")));
app.use(express.static(path.join(__dirname,"./databases")));
app.use(express.static(path.join(__dirname,"./jsFiles")));
app.use(express.static(path.join(__dirname,"./scriptFiles")));
app.use(express.static(path.join(__dirname,'../../ClientSide')));

// cptcha
const captchaApi=require("./jsFiles/captchaGenarator");

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
    res.sendFile(path.join(__dirname+"../../../ClientSide/amazon.html"));
})
app.get('/captcha', (req, res) =>{
    res.send(captchaApi.captcha(req,res));
});


let serverOtp=0;
app.post("/email",async (req,res)=>{
    const sendMail=require("./jsFiles/mailSender");
    await sendMail(req.body.email).then(data=>{
        console.log(data);
        serverOtp=data;
        res.send({success:true});
        setTimeout(()=>{
            serverOtp=null;
            console.log("OTP expired");
            res.send({success:false,otp:'expired'});
        },600000);
    }).catch(err=>{
        res.send({success:false,err});
    })
});

var matched=false;
app.post("/varifyOtp",async (req,res)=>{
    let clientOtp=req.body.otp;
    if(clientOtp===serverOtp && clientOtp>99999 && clientOtp<=999999){
        matched=true;
        res.send({success:true,otp:'otp matched'});
    }else{
        matched=false;
        res.send({success:false,otp:'otp not matched'});
    }
});
app.post('/signUp',async (req,res)=>{
    const users=require("./database/userSchema");
    if(matched==true){
        try{
            let user=await users.findOne({email:req.body.email});
            if(!user){
                await users.insertMany([req.body]);
            }else{
                res.send({success:false,msg:'Already have an account'});
            }
        }catch(err){
            res.send({success:false,msg:'Already have an account'});
        }
        matched=false;
        res.send({success:true,account:'created'});
        res.sendFile(path.join(__dirname+"../../public/html/index.html"));
    }
    else{
        res.send({success:false,account:'None'});
    }
});

let captchaValidation=false;
app.post('/verify-captcha', express.json(), (req,res) =>{
    const result=captchaApi.verifyCaptcha(req);
    captchaValidation=result.success;
    res.send(result);
});

app.post('/logIn',(req,res)=>{
    const login=require("./jsFiles/login");
    login(req,res).then(result=>{
        if(result.success && captchaValidation) res.sendFile(path.join(__dirname,"../../ClientSide/amazon.html"));
        else res.send({result,captchaValidation});
    })
});

app.post('/forgotPassword',async (req,res)=>{
    const mongo=require("./database/userSchema");
    if(matched==true){
        try{
            await mongo.updateOne({email:req.body.email},{$set:{
                otp:req.body.otp,
                time:req.body.time,
                password:req.body.password,
                confirmPassword:req.body.confirmPassword
            }});
        }catch{
            res.send({success:false,msg:'Invalid OTP'});
        }
        matched=false;
        res.sendFile(path.join(__dirname+"../../public/html/index.html"));
        res.send({success:true,msg:'Password Updated'});
    }
    else{
        res.send({success:false,msg:'Invalid OTP'});
    }
})

app.post('/findUser',async (req,res)=>{
    const mongo=require("./database/userSchema");
    const user=await mongo.findOne({email:req.body.email});
    if(user){
        const sendMail=require("./jsFiles/mailSender");
        serverOtp=await sendMail(req.body.email);
        setTimeout(()=>{
            serverOtp=null;
            console.log("OTP expired");
            res.send({success:false,otp:'expired'});
        },600000);
        res.send({success:true,msg:`OTP is sent to ${req.body.email}`});
    }else{
        res.send({success:false,msg:'No user found'});
    }
})



app.listen(port,()=>{
    console.log(`http://localhost:${port}/`);
})