var mongodb=require('mongodb'),
    mongoose=require('mongoose'),
     Schema=mongoose.Schema;

var userSchema=new Schema({
    username:{type:String,default:null},
    password:{type:String,default:null},
    mobile:{type:String,default:null},
    isVerifiedMobile:{type:Number,default:0},
    verifyCode:{type:String,default:null},
    email:{type:String,default:null},
    roleUser:{type:String,default:'customer'},
    dateCreated:{type:Number,default:null},
    timeCreated:{type:String,default:null},
    accountStatus:{type:String,default:'pending'},
    isFillCompleteRegistration:{type:Number,default:0}

})
module.exports=mongoose.model('user',userSchema);

