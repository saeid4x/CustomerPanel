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
     var urlCloud='mongodb+srv://saeid:saeid123@cluster0-z7vca.mongodb.net/test?retryWrites=true&w=majority'
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

   var status;
    userModel.findOne({mobile:req.body.mobile}).then((data,err)=>{
        if(data ){  
             
            if(data.isVerifiedMobile==1) {
                status= 'verify';  
                res.json({status:'verify',data:data})            

            }
            else if(data.isVerifiedMobile ==0){
              res.json({status:'no-verify',data:data})                      

            }

        }
        else {
          res.json({status:'no-user'})  
        }
    }) 
    
});
   
 
router.get('/generateVerifyCode',(req,res)=>{
  /*  generate verify code  */ 
  
  let code=Helper.GenerateVerifyCode(10000,50000);
  res.json(code);
});


router.post('/getUser/:mobile',(req,res)=>{
  console.log('mobile is =',req.params.mobile)

  userModel.findOne({mobile:req.body.mobile}).then((data,err)=>{
    if(data){
      
      res.json(data)
    }
    else if(err){
      res.json(err)
    }
    
  
});
});

 //get user info based-id
 router.get('/:userID/getUser',(req,res)=>{
  userModel.findOne({_id:req.params.userID})
   .then((data)=>{
     if(data){
       res.json({userInfo:data});
    
     }else{
       res.json({userInfo:null})
     }
   })
})

//get user based mobile
 router.get('/getUser/:mobile',(req,res)=>{
   let mobile=req.params.mobile;
   userModel.findOne({mobile})
    .then((data=>{
      if(data){
        res.json(data)
      }
      else{
        new userModel({
          mobile
        }).save((err,doc)=>{
          if(doc){
            res.json(doc)
          }
          else if(err){
            res.json({err:true})
          }
        })
      }
    }))
 
 })

 router.post('/assignVerifyCodeToUser',(req,res)=>{
    let {mobile,verifyCode}=req.body;
   userModel.findOneAndUpdate({mobile},{$set:{verifyCode}})
    .then((data)=>{
      if(data){
        res.json(data);
      }
      else{
        res.json({err})
      }
      
    })
 })

 router.post('/test50',(req,res)=>{
   res.json(req.body.accountStatus)
 })
 router.post('/complateRegisteration',(req,res)=>{
   let dateCreated=Helper.MiladiToMilisecond(Helper.CurrentDate());
  let time=Helper.CurrentTime();
  let mobile=req.body.mobile;

  let newData={
    username: req.body.username,
    password:req.body.password, 
    verifyCode:null,
    isVerifiedMobile:1,
    accountStatus:'active',

    email:req.body.email,  
    dateCreated:dateCreated,
    timeCreated:time,
    isFillCompleteRegistration:1
  };
  console.log(newData)
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

router.post('/saveUser/:mobile/:roleUser',(req,res)=>{

  let data={
    mobile:req.params.mobile,
    username:'null',
    password:req.body.password,
    isVerifiedMobile:0,
    verifyCode:null,
    email:'null',
    roleUser:req.params.roleUser,
    dateCreated:Helper.MiladiToMilisecond(Helper.CurrentDate()),
    timeCreated:Helper.CurrentTime(),
    accountStatus:'pending',
    isFillCompleteRegistration:0
  }

  userModel.findOneAndUpdate({mobile:req.params.mobile},data,{upsert:true})
    .then((data)=>{
      if(data){
        res.json(data);
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

// no-need 
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