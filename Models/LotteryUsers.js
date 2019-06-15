var mongodb=require('mongodb'),
    mongoose=require('mongoose'),
    Schema=mongoose.Schema;
 
var LotteryUsersSchema=new Schema({
    userID:{type:String,default:null},
    userMobile:{type:String,default:null},
    fromDate:{type:Number,default:null},
    toDate:{type:Number,default:null},
    lotteryType:{type:String,default:null}
    
   
   
})
module.exports=mongoose.model('lotteryUsers',LotteryUsersSchema);