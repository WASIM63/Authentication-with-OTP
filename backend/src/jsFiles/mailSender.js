const otpGenerator=require("otp-generator");

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
        user: "wamallick01@gmail.com",
        pass: "qgvf gkuk zmcq sqbp"
    }
});

async function sendMail(emailId){
    try{
        let otp=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false ,lowerCaseAlphabets:false});
        const mailConfigurations = {
            from: "wamallick01@gmail.com",
            to:emailId,
            subject:"One Time Password",
            text:`Your OTP is ${otp}`
        };
        await transporter.sendMail(mailConfigurations,(err, info) => {
            if (err) console.log(err);
            else {
                console.log("Mail sent successfully.");
                console.log(info);
            }
        });
        return otp;
    }catch(err){
        console.log(err);
    }
}
module.exports=sendMail;
