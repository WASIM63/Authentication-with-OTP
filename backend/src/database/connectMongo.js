const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/loginWesite/")
.then(()=>{
    console.log("Mongodb successfully connected");
})
.catch((err)=>{
    console.error(err);
});