var mongodb=require('mongodb'),
    mongoose=require('mongoose'),
    Schema=mongoose.Schema;

var orderSchema=new Schema({
    userID:{type:String,default:null},
    orderName:{type:String,default:null},
    orderPrice:{type:Number,default:null},
    orderDate:{type:Number,default:null},
    orderTime:{type:String,default:null},
    branchID:{type:String,default:null},
    branchName:{type:String,default:null},
    orderPoint:{type:Number,default:0}
    
    
})
module.exports=mongoose.model('order',orderSchema);