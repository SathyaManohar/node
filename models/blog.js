const mongoose=require("mongoose");

 
const blogschema=new mongoose.Schema({
title:{
    type:String,
    required:true,
},
body:{
    type:String,
    required:true,
},
coverimageurl:{
    type:String,

},
createdby:{
    type:mongoose.Schema.ObjectId,
    ref:'user',
}
},{timestamps:true}
);


const blogmodelobj=mongoose.model("blog",blogschema);

module.exports={
    blogmodelobj,
}