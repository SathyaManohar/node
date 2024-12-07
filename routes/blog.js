const express=require("express");
const router=express.Router();
const multer=require("multer");
const path=require("path");
const {blogmodelobj}=require("../models/blog");
const {commentmodelobj}=require("../models/comment");
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.resolve(`./public/uploads`));
    },
    filename:function(req,file,cb){
        const filename=`${Date.now()}-${file.originalname}`;
        cb(null,filename);
    },
});
const upload=multer({storage:storage});
router.get('/add-new',(req,res)=>{
    return res.render("addblog",{
        user:req.user,
    });
});

router.get('/:id',async(req,res)=>{
    const blogid=req.params.id;
    const blog=await blogmodelobj.findOne({_id:blogid}).populate("createdby");
    const comments=await commentmodelobj.find({blogid:blogid}).populate("createdby");
    console.log("comments",comments);
    console.log("blog",blog);
    return res.render("blog",{
        blog:blog,
        user:req.user,
        comments:comments,
    })
})

router.post('/comment/:blogid',async(req,res)=>{
const commentdetails=req.body;
const comment=await commentmodelobj.create({
content:commentdetails.content,
blogid:req.params.blogid,
createdby:req.user._id,
});
return res.redirect(`/blog/${req.params.blogid}`);
});

router.post('/',upload.single("coverimageurl"),async(req,res)=>{
const blogger=req.body;
console.log(blogger);
await blogmodelobj.create({
title:blogger.title,
body:blogger.body,
coverimageurl:`/uploads/${req.file.filename}`,
createdby:req.user._id,
});
return res.redirect('/');
});

module.exports=router;