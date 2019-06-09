var mongodb=require('mongodb'),
    mongoose=require('mongoose'),
    Schema=mongoose.Schema;

var TestSchema=new Schema({
    name:{type:String,default:null},
    date:{type:Date,default:null},
    goods:{type:String,default:null}
})

module.exports=mongoose.model('test',TestSchema);