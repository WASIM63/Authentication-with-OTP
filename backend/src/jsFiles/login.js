const users=require("../database/userSchema");

async function login(req,res){
    try{
        let email=req.body.email;
        let password=req.body.password;
        let rememberMe=req.body.rememberMe;
        try{
            let user=await users.findOne({email:email});
            if(user){
                if(password===user.password){
                    await users.updateOne({email:user.email},{$set:{"rememberMe":rememberMe}});
                    return ({success:true,msg:'User verified'});
                }else{
                    return({success:false,msg:"Wrong password"});
                }
            }else{
                return({success:false,msg:"user not exists"});
            }
            
            
        }catch(err){
            return({success:false,msg:"User not exists"});
        }
    }
    catch(err){
        return({success:false,msg:"Something is wronged"});
    }
}
module.exports=login;