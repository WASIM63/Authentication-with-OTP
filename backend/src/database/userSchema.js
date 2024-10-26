const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/LoginWebsite')
.then(()=>{
    console.log('Mongodb connected successfully.');
}).catch((err)=>{
    console.log(err,'Connection to Mongodb has failed');
})

const signUpSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:Number,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    rememberMe:{
        type:String
    }
})

// creating collection
const users=new mongoose.model('users',signUpSchema);

module.exports=users;