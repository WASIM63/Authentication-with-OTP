require('dotenv').config();

const otpGenerator=require("otp-generator");

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service:process.env.MAIL_SERVICE,
    secure: false,
    auth: {
        user:process.env.EMAIL_ID,
        pass:process.env.EMAIL_PASS
    }
});

async function sendMailFun(emailId){
    console.log(emailId);
    try{
        let otp=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false ,lowerCaseAlphabets:false});
        const mailConfigurations = {
            from:process.env.EMAIL_ID,
            to:emailId,
            subject:"One Time Password",
            text:`Your OTP is ${otp}. It will be expired in 10 minutes.`
        };
        transporter.sendMail(mailConfigurations,(err, info) => {
            if (err) console.log("The error is here :",err);
            else {
                console.log("Mail sent successfully.");
                console.log(info);
            }
        });
        console.log(otp);
        return otp;
    }catch(err){
        console.log(err);
    }
}
module.exports=sendMailFun;
