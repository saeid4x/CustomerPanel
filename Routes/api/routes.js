var express=require('express'),
      router=express();
  var Helper=require('../../Controller/Helper.js');
  var userModel=require('../../Models/users');
  var mongodb=require('mongodb'),
      mongoose=require('mongoose');
 var Keys=require('../../config/keys');
var multer=require('multer');
     

    //initials 
 // <upload-multer>
var storage=multer.diskStorage({
  destination:'public/uploads/images',
 filename:(req,file,cb)=>{
   cb(null,'post-'+ Date.now()+path.extname(file.originalname));    
 }
})
var upload=multer({
   // dest:'../public/uploads/images/',
   storage:storage,
   limits:{fileSize:100 *1024 * 1024} , //100MB,  
 
})

// <upload-multer />




  //database
  var mongodb = require("mongodb"),
      mongoose = require("mongoose");
      var url='mongodb://127.0.0.1:27017/customerClub';
     var urlCloud='mongodb+srv://saeid:saeid123@cluster0-z7vca.mongodb.net/customerClub?retryWrites=true&w=majority'
  mongoose.connect(urlCloud,{useNewUrlParser:true},(err,success)=>{
    if(err){
      console.log('error coonnect to database=',err);
    }
    else{
      console.log('successfuly connect to database');
    }
  })


  //*******   ~/api/[routes]     ***** */

router.get('/',(req,res)=>{
  res.send('api-routes');
})



router.post('/checkActiveUser',upload.none(),(req,res)=>{

   
    userModel.findOne({mobile:req.body.mobile}).then((data,err)=>{
        if(data ){  
             
            if(data.isVerifiedMobile==1) {
                status= 'verify';              

            }
            else if(data.isVerifiedMobile ==0){
                status= 'no-verify';                           

            }

        }
        else {
            status=  'no-user';
        }
    }).then(()=>{
      switch(status){
        case 'verify' :{
          res.send('verify')
        }
        break;
        case 'no-verify':{
          res.send('no-verify');
        }
        break;
        case 'no-user':{
          res.send('no-user')
        }
      }
        
    });
    
});
   
 
router.get('/generateVerifyCode',(req,res)=>{
  /* get mobile and generate verify code and initial that user with this code */

  //generate verify code 
  let code=Helper.GenerateVerifyCode(10000,50000);
  res.json(code);
});
router.post('/getUser',(req,res)=>{
  console.log('mobile is =',req.body.mobile)

  userModel.findOne({mobile:req.body.mobile}).then((data,err)=>{
    if(data){
      
      res.json(data)
    }
    else if(err){
      res.json(err)
    }
    
  
});
});
 router.post('/complateRegisteration',(req,res)=>{
   let dateCreated=Helper.MiladiToMilisecond(Helper.CurrentDate());
  let time=Helper.CurrentTime();
  let mobile=req.body.mobile;
  let newData={
    username: req.body.username,
    password:req.body.password, 
    verifyCode:null,
    isVerifiedMobile:1,

    email:req.body.email,  
    dateCreated:dateCreated,
    timeCreated:time,
    isFillCompleteRegistration:1
  };
  userModel.findOneAndUpdate({mobile:mobile},{$set:newData}
      , (err,doc)=>{
        if(doc){
          res.json(doc);

        }
        else if(err){
          res.json(false)
        }
       
      })

   
 })
 router.post('/changeAccountStatus',(req,res)=>{
   let accountStatus=req.body.accountStatus;
   let mobile=req.body.mobile;
   let isVerifiedMobile=req.body.isVerifiedMobile;
   let verifyCode=req.body.verifyCode
   userModel.findOneAndUpdate({mobile},{$set:{
    accountStatus,isVerifiedMobile,verifyCode

   }},(err,doc)=>{
     if(doc){
       res.json(true)
     }
     else if(err){
       res.json(false);
     }
   })
 })
router.post('/initialUser',(req,res)=>{
  //update user
  new userModel({
    mobile:req.body.mobile,
    verifyCode:req.body.verifyCode
  }).save((err,data)=>{
    if(err){
      res.json({err:err,result:false})
    }else{
      res.json({err:false,result:data})
    }
  });



})
 
//remove a user
router.get('/removeUser/:mobile',(req,res)=>{
  let mobile=req.params.mobile
  console.log('mobild=',mobile);
  userModel.findOneAndDelete({mobile}).then((data)=>{
    res.json(data);
    console.log(data);
  })
})

//test  routes

router.get('/test',(req,res)=>{
  // // let dateCreated=new Date().getFullYear()+'/'+new Date().getMonth()+'/'+new Date().getDate()
  // let date=new Date();
  // let time=date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
  // res.json(time)
})
module.exports=router;