var mongodb=require('mongodb'),
    mongoose=require('mongoose'),
    Schema=mongoose.Schema;

// adminBranch=username
//creatorBranch=username


// creatorBranch:{type:String,default:null},
var branchSchema=new Schema({
    branchName:{type:String,default:null},
    adminBranch:{type:String,default:null},
   
    createDate:{type:String,default:null},
    createTime:{type:String,default:null},
})
module.exports=mongoose.model('branch',branchSchema)