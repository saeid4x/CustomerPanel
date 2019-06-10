var express=require('express'),
    router=express.Router();
   var multer=require('multer');
var profileModel=require('../../Models/profile');
var orderModel=require('../../Models/orders');
var lotteryUsersModel=require('../../Models/LotteryUsers');
var path=require('path')
var Helper=require('../../Controller/Helper')


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


router.get('/:userID/getProfile',(req,res)=>{
   profileModel.findOne({userID:req.params.userID})
      .then((data)=>{
         if(data){
            
            res.json(data);
            console.log(data)
            // console.log(data);
         }
         
      })
})
router.post('/:userID/setProfile',upload.single('avatar_img'),(req,res)=>{

   let {name,family,age,address,gender}=req.body;
    let avatar=req.file.filename;
    console.log(avatar)
   
   profileModel.findOneAndUpdate({userID:req.params.userID},{$set:{name,family,age,address,gender,avatar}},{upsert:true})
      .then((data)=>{
         if(data){
            // res.json(data)
            res.redirect('http://127.0.0.1:3000/test')
            console.log(data);
           

         }
      })

})


//ReportBranchSpec(default)
router.get('/:userID/report/branchRelatedOrderUser',(req,res)=>{
   let userID=req.params.userID;

   orderModel.find({userID})
      .then((data=>{
         if(data){
            res.json(data)
         }
         else{
            res.send('no data')
         }
       
      })).catch((err)=>{
         res.json(err)
      })
   
})
//ReportBranchSpec(apply filter)
router.post('/:userID/report/branchRelatedOrderUser',(req,res)=>{
   let userID=req.params.userID;
    
   let fromDate=req.body.fromDate;
   let toDate=req.body.toDate;
   let branchID=req.body.selectBranch;
   let orderPrice=60000;
   console.log('600',branchID)

   let fromDateMili= Helper.MiladiToMilisecond(Helper.ToMiladi(fromDate));
   let toDateMili= Helper.MiladiToMilisecond(Helper.ToMiladi(toDate));
   console.log('typeof fromDateMili=',typeof fromDateMili);
   console.log('typeof toDateMili=',typeof toDateMili);
   
   orderModel.find({userID,branchID,orderDate:{$lte:toDateMili,$gte:fromDateMili}})
      .then((data)=>{
         if(data){
            res.json(data)
         }
         
        
      }).catch((err)=>{
        res.json(err)
      })
});
   
   
router.post('/:userID/report/complete',(req,res)=>{
   let userID=req.params.userID;    
   let fromDate=req.body.fromDate;
   let toDate=req.body.toDate;
   let fromDateMili= Helper.MiladiToMilisecond(Helper.ToMiladi(fromDate));
   let toDateMili= Helper.MiladiToMilisecond(Helper.ToMiladi(toDate));

   orderModel.find({userID,orderDate:{$gte:fromDateMili,$lte:toDateMili}})
      .then((data)=>{
         if(data){
            res.json(data);
         }
         
      }).catch((err)=>{
         res.json(err)
      })
})
   
router.get('/',(req,res)=>{
   res.send('api- customer');
})




router.get('/test/2',(req,res)=>{
  
   orderModel.updateMany({},{$set:{orderPoint:10}},{upsert:true})
      .then((data)=>{
         if(data){
            res.json(data)
         }
         else{
            res.send('no-data')
         }
      }).catch((err)=>{
         res.json(err)
      })
})

router.post('/test/setProfile',(req,res)=>{

   new profileModel({
      userID:req.body.userID,
      name:req.body.name,
      family:req.body.family,
      address:req.body.address,
      avatar:req.body.avatar,
      gender:req.body.gender,
      age:req.body.age
   }).save((err,data)=>{
      if(data){
         console.log(data)
         res.json(data)
      }
      else if(err){
         res.json(err)
      }
   })
})

router.post('/test2',(req,res)=>{
   let shamsi=req.body.shamsi;
   console.log('shamsi',shamsi)
   let date= Helper.MiladiToMilisecond(Helper.ToMiladi(shamsi));
   let t=date-1;
   res.json(t)


})

router.post('/test3',(req,res)=>{
   orderModel.find({total:{$sum:"$orderPrice"}})
      .then((data)=>{
         console.log(data)
      })
})

router.get('/:userID/orders/totalPriceAndCountOrder',(req,res)=>{
   let userID='user120';
   var test= orderModel.aggregate([
      {$match:{userID:userID}} ,
      {$group:{_id:"$userID",count:{$sum:1},total:{$sum:'$orderPrice'},point:{$sum:'$orderPoint'}}} 
    ]).exec((err,loc)=>{
        loc.map(item=>{
         res.json({total:item.total,count:item.count,totalPoint:item.point});
        })
        
    });
})



router.get('/test',(req,res)=>{
   new lotteryUsersModel({
      userID:'user120',
      fromDate:120,
      toDate:80,
      lotteryType:'month'
   }).save((err,doc)=>{
      if(doc){
         res.json(doc)
      }
      else if(err){
         res.json(err)
      }
     
   })

})


module.exports=router;