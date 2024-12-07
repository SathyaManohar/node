const mongoose=require("mongoose");
const {createHmac,randomBytes}=require("crypto");//createHmac is used to hash user's password
const {createtokenforuser,validatetoken}=require("../services/auth");
//Passwords are sensitive information. If stored in plaintext and the database is breached, attackers would gain access to all user passwords. Hashing transforms a password into a fixed-length string that cannot be easily reversed, protecting the original password.
const userschema=new mongoose.Schema({
fullname:{
    type:String,
    required:true,
},
email:{
    type:String,
    unique:true,
    required:true,
},
password:{
    type:String,
    required:true,

},
salt:{
    type:String,

},
profileimageurl:{
type:String,
default:'/images/user.png',
},
role:{
    type:String,
   enum:['user','admin'],
   default:'user',
}
},{timestamps:true}
);

userschema.pre("save",function(next){
const user=this;
if(!user.isModified("password"))return;

const salt=randomBytes(16).toString();// generates a random string , this is a 'secret key' of 16 length unique for each user
//using that key, generating a hashed password : createHmac(algorithmused to generate hashedpw,secret key of 16 length)
const hashedpassword=createHmac("sha256",salt).update(user.password).digest("hex");
//digest(hex) converts binaryhash into hexadecimal string ex:"ef92b778bafee8a5a0e05a6047e3cc16..."
this.salt=salt;
this.password=hashedpassword;

next();
});
//define static method before model creation

//try for using 
userschema.static('matchPasswordAndGeneratetoken',async function(email,password){
    const targetuser=await this.findOne({email:email});
    if(!targetuser)throw new Error("User NotFound");
    const salt=targetuser.salt;
    const originalhashedpassword=targetuser.password;
    const currenthashedpassword=createHmac("sha256",salt).update(password).digest("hex");
    if(originalhashedpassword!==currenthashedpassword)throw new Error("User Notfound");
    const token=createtokenforuser(targetuser);
    return token;
    });
const usermodelobj=mongoose.model("user",userschema);

module.exports={
    usermodelobj,
}