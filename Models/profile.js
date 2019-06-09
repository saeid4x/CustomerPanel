var mongodb=require('mongodb'),
    mongoose=require('mongoose'),
    Schema=mongoose.Schema;

var profileSchema=new Schema({
    userID:{type:String,default:null},
    name:{type:String,default:null},
    family:{type:String,default:null},     
    address:{type:String,default:null},
    avatar:{type:String,default:null},
    gender:{type:String,default:null},
    age:{type:Number,default:null},
    
    
    
})
module.exports=mongoose.model('profile',profileSchema)