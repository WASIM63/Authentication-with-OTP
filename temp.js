// const express=require('express');
// const app=express();
// const path=require('path');
// const hbs=require('hbs');
// const users=require('./database/userSchema');

// const port=process.env.PORT || 3000; //provide a available port

// const templatePath=path.join(__dirname,'../templates');

// app.use(express.json());
// app.set('view engine','hbs');
// app.set('views',templatePath);
// app.use(express.urlencoded({extended:false}));
// app.use(express.static('public'));


// app.get('/', (req, res) => {
//     res.render('logIn');
// });

// app.get('/signUp', (req, res) => {
//     res.render('signUp');
// });
// app.get('/forgotPassword', (req, res) => {
//     res.render('forgotPassword');
// });

// app.post("/signUp",async(req,res)=>{
//     let password=req.body.setPassword;
//     try{
//         const data={
//             name:req.body.name,
//             dob:req.body.dob,
//             gender:req.body.gender,
//             mobileNumber:req.body.mobileNumber,
//             email:req.body.email,
//             password:password
//         }
//         otp=req.body.otp;
//         confirmPassword=req.body.confirmPassword;
//         if(password==confirmPassword){
//             await users.insertMany([data]);
//             console.log(data);
//             res.render('home');
//         }
//         else{
//             console.log("Passwords are not matched");
//         }
//     }
//     catch(err){
//         console.log(err);
//         res.render("signUp");
//     }
// })

// // app.post("/logIn",async(req,res)=>{
// //     let email=req.body.email;
// //     let loginPassword=req.body.password;
// //     let captcha=req.body.captcha;
// //     let rememberMe=req.body.rememberMe;
// //     try{
// //         let user=await users.findOne(email);
// //         if(user){
// //             if(user.setPassword===loginPassword){
// //                 // alert("Log IN successfully ✓");
// //                 users.insertOne({"rememberMe":rememberMe});
// //                 res.render("home");
// //             }else{
// //                 // alert("Wrong Password ✕");
// //             }
// //         }else{
// //             // alert("User not exists");
// //         }
// //     }
// //     catch{
// //         res.render("logIn");
// //     }
// // })


// app.listen(port,()=>{
//     console.log(`Server is running on http://localhost:${port}/`)
// });














// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;

// const html = `
// <html>
//   <head>
//     <title>My Page</title>
//   </head>
//   <body>
//     <h1>Hello World</h1>
//     <p>This is a paragraph.</p>
//   </body>
// </html>
// `;

// const dom = new JSDOM(html);
// const document = dom.window.document;

// // Get the h1 tag
// const h1Tag = document.querySelector("h1");
// console.log(h1Tag.textContent); // Outputs: Hello World

// // Get all p tags
// const pTags = document.querySelectorAll("p");
// pTags.forEach((pTag) => console.log(pTag.textContent)); // Outputs: This is a paragraph.

let str='Wasim2001@';
for(let i=0;i<str.length;i++){
    console.log(str[i]);
}