var mongodb=require('mongodb'),
    mongoose=require('mongoose'),
    Schema=mongoose.Schema;

var PointsBranchSchema=new Schema({
    NumberBranch:{type:Number,default:null},
    point:{type:Number,default:null},
    isMontlyLottery:{type:Number,default:null},
    isYearlyLottery:{type:Number,default:null}
 })
module.exports=mongoose.model('PointsBranch',PointsBranchSchema);