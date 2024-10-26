const users=require("../database/userSchema");

async function login(req,res){
    try{
        let email=req.body.email;
        let password=req.body.password;
        let rememberMe=req.body.rememberMe;
        console.log(rememberMe);
        try{
            let user=await users.findOne({email:email});
            console.log(user);
            if(user){
                console.log(user.password+password);
                if(password===user.password){
                    res.send("Home");
                    await users.updateOne({email:user.email},{$set:{"rememberMe":rememberMe}});
                }else{
                    res.send("Wrong password");
                }
            }else{
                res.send("...user not exists");
            }
            
            
        }catch(err){
            console.log(err);
            res.send("+User not exists");
        }
    }
    catch(err){
        console.log(err);
        res.send("Something is wronged");
    }
}
module.exports=login;