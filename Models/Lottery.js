var mongodb=require('mongodb'),
    mongoose=require('mongoose'),
    Schema=mongoose.Schema;
 
var LotterySchema=new Schema({
    minPointForMontlyLottery:{type:Number,defaut:null},
    minPointForYearlyLottery:{type:Number,defaut:null},
   
   
})
module.exports=mongoose.model('lottery',LotterySchema);