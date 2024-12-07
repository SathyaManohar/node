const mongoose=require("mongoose");

const commentschema=new mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    createdby:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
    },
    blogid:{
        type:mongoose.Schema.ObjectId,
        ref:'blog',
    },
},{timestamps:true}
);

const commentmodelobj=mongoose.model('comment',commentschema);

module.exports={
    commentmodelobj,
}