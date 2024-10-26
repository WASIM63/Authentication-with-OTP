const users=require("../database/userSchema");

async function signUp(req,res){
    try{
        let password=req.body.setPassword;
        const data={
            name:req.body.name,
            dob:req.body.dob,
            gender:req.body.gender,
            mobileNumber:req.body.mobileNumber,
            email:req.body.email,
            password:password
        }
        let confirmPassword=req.body.confirmPassword;
        try{
            if(password===confirmPassword){
                await users.insertMany([data]);
                res.send("Home");
            }else{
                res.send("Wrong password");
            }
            
        }catch(err){
            console.log(err);
            res.send("<Wrong Password");
        }
    }
    catch(err){
        console.log(err);
        res.send("Something is wronged");
    }
}
module.exports=signUp;