var express=require('express'),
    router=express.Router();
   var multer=require('multer');
var profileModel=require('../../Models/profile');
var orderModel=require('../../Models/orders');
var userModel=require('../../Models/users');
var pointModel=require('../../Models/points');

var lotteryUsersModel=require('../../Models/LotteryUsers');
var path=require('path');
var Helper=require('../../Controller/Helper');
var Keys=require('../../config/keys')


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
             
            // console.log(data);
         }
         
      })
})
router.post('/:userID/setProfile',upload.single('avatar_img'),(req,res)=>{

   var {name,family,age,address,gender,roleUser}=req.body;
   let avatar=req.file.filename;
 
   profileModel.findOneAndUpdate({userID:req.params.userID},{$set:{name,family,age,address,gender,avatar}},{upsert:true})
   .then((data)=>{
      if(data){
         switch (roleUser) {
            case 'admin':{
               res.status(200).redirect(Keys.frontendUrl+'/admin/dashboard')

            } 
               break;
               case 'adminBranch':{
                  res.status(200).redirect(Keys.frontendUrl+'/adminBranch/dashboard')

               }
               break;
               case 'customer':{
                  res.status(200).redirect(Keys.frontendUrl+'/customer/dashboard')
               }
               break;
          
         }
         // res.json(data)
      }
   })

    
 
  

})


//ReportBranchSpec(default)
router.get('/:userID/report/getOrderUser',(req,res)=>{
   let userID=req.params.userID;

   orderModel.find({userID})
      .then((data)=>{
         if(data){
            res.json(data)
         }
         else{
            res.json({err:'no-data'})
         }
       
      }).catch((err)=>{
         res.json(err)
      })
   
})
//ReportBranchSpec(apply filter)
router.post('/:userID/report/branchRelatedOrderUser',(req,res)=>{
   let userID=req.params.userID;
   var fromDate;
   var toDate;
     if(req.body.fromDate == undefined || !req.body.fromDate){
        fromDate='1300/1/1';
     }
     if(req.body.toDate==undefined || !req.body.toDate){
        toDate='1500/1/1'
     }
     if(req.body.fromDate){
        fromDate=req.body.fromDate
     }
     if(req.body.toDate){
        toDate=req.body.toDate
     }
    console.log('fromDate=',fromDate);
    console.log('toDate=',toDate);
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
   // let fromDate=req.body.fromDate;
   // let toDate=req.body.toDate;
   var fromDate;
   var toDate;
     if(req.body.fromDate == undefined || !req.body.fromDate){
        fromDate='1300/1/1';
     }
     if(req.body.toDate==undefined || !req.body.toDate){
        toDate='1500/1/1'
     }
     if(req.body.fromDate){
        fromDate=req.body.fromDate
     }
     if(req.body.toDate){
        toDate=req.body.toDate
     }
    console.log('fromDate=',fromDate);
    console.log('toDate=',toDate);
   let fromDateMili= Helper.MiladiToMilisecond(Helper.ToMiladi(fromDate));
   let toDateMili= Helper.MiladiToMilisecond(Helper.ToMiladi(toDate));

//get filtered-orders
   orderModel.find({userID,orderDate:{$gte:fromDateMili,$lte:toDateMili}})
      .then((data)=>{
         if(data){
            res.json(data);
         }
         
      }).catch((err)=>{
         res.json(err)
      })

      //get additional info about order

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

router.post('/report/complete/otherInfo',(req,res)=>{
  
   var fromDate;
   var toDate;
   let userID=req.body.userID;
     if(req.body.fromDate == undefined || !req.body.fromDate){
        fromDate='1300/1/1';
     }
     if(req.body.toDate==undefined || !req.body.toDate){
        toDate='1500/1/1'
     }
     if(req.body.fromDate){
        fromDate=req.body.fromDate
     }
     if(req.body.toDate){
        toDate=req.body.toDate
     }
    console.log('fromDate=',fromDate);
    console.log('toDate=',toDate);
   let fromDateMili= Helper.MiladiToMilisecond(Helper.ToMiladi(fromDate));
   let toDateMili= Helper.MiladiToMilisecond(Helper.ToMiladi(toDate));
   orderModel.aggregate([
      {$match:{userID,orderDate:{$gte:fromDateMili,$lte:toDateMili}}},
      {$group:{_id:'$userID',countOrder:{$sum:1},totalPrice:{$sum:'$orderPrice'},sumPoint:{$sum:'$orderPoint'}}}
   ]).exec((err,loc)=>{
       
      if(loc){
         loc.map(item=>{
            let data={
               countOrder:item.countOrder,
               sumPrice:item.totalPrice,
               sumPoint:item.sumPoint,
               
            }
            
             res.json({data,err:false});
             console.log(item.countOrder);
          })
      }
      else if(err){
         res.json({err:true})
      }
   })




})

router.post('/test3',(req,res)=>{
   orderModel.find({total:{$sum:"$orderPrice"}})
      .then((data)=>{
         console.log(data)
      })
})

router.get('/:userID/orders/totalPriceAndCountOrder',(req,res)=>{
   let userID=req.params.userID;
   var test= orderModel.aggregate([
      {$match:{userID:userID}} ,
      {$group:{_id:"$userID",count:{$sum:1},total:{$sum:'$orderPrice'},point:{$sum:'$orderPoint'}}} 
    ]).exec((err,loc)=>{
        loc.map(item=>{
         res.json({total:item.total,count:item.count,totalPoint:item.point});
        })
        
    });
})

router.get('/getUser/:userID',(req,res)=>{
   userModel.findOne({_id:req.params.userID})
      .then((data)=>{
         if(data){
            res.json(data);
         }
      })
})

router.get('/test5',(req,res)=>{
    new pointModel({
       basePoint:1,
       basePrice:1000,
       minPointForMontlyLottery:30,
       minPointForYearlyLottery:50
    }).save((err,data)=>{
       if(data){
          res.json(data)
       }
    })
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