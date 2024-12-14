require('dotenv').config();

const mongoose=require('mongoose');
mongoose.connect(process.env.MONGO_URL)
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
    mobile:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    otp:{
        type:Number,
        required:true,
    },
    time:{
        type:Date,
        require:true
    },
    password:{
        type:String,
        required:true,
    },
    confirmPassword:{
        type:String,
        required:true
    },
    rememberMe:{
        type:String
    }
})

// creating collection
const users=new mongoose.model('users',signUpSchema);

module.exports=users;