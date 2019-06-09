var mongodb=require('mongodb'),
    mongoose=require('mongoose'),
    Schema=mongoose.Schema;
 
var pointSchema=new Schema({
    basePoint:{type:Number,defaut:null},
    basePrice:{type:Number,defaut:null},
    minPointForMontlyLottery:{type:Number,default:null},
    minPointForYearlyLottery:{type:Number,default:null}

    
   
})
module.exports=mongoose.model('point',pointSchema);