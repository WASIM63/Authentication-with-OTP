async function forgotPassword(req,res){
    try{
        let email=req.body.email;
        let otp=req.body.otp;
        let password=req.body.newPassword;
        let confirmPassword=req.body.confirmNewPassword;
        
    }
    catch(err){
        console.log(err);
        res.send("Something is wronged");
    }
}
module.exports=forgotPassword();