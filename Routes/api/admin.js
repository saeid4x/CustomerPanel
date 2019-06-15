var express=require('express')     
    router=express();
var branchModel=require('../../Models/branch');
var userModel=require('../../Models/users');
var pointModel=require('../../Models/points');
var PointsBranchModel=require('../../Models/PointsBranch');
var LotteryModel=require('../../Models/Lottery');
var LotteryUsersModel=require('../../Models/LotteryUsers');
var orderModel=require('../../Models/orders');
var Keys=require('../../config/keys')
var Helper=require('../../Controller/Helper');
 

//initials 
 

router.get('/',(req,res)=>{
    res.send('api-admin');
});

router.get('/getBranches',(req,res)=>{
    branchModel.find({})
        .then((data)=>{
            if(data){
                res.json(data)
            }
        })
})

router.post('/addBranch',(req,res)=>{
    let branchName=req.body.branchName;

    
    let createDate=Helper.MiladiToMilisecond(Helper.CurrentDate())
    let createTime=Helper.CurrentTime();
    let adminBranch=null;
    let newBranch={
             //must be saved       
        branchName,
        adminBranch,

        createDate,
        createTime
    }
    branchModel.findOneAndUpdate({branchName},{$set:newBranch},{upsert:true})
        .then((data)=>{
            console.log(data);
            res.json({saved:true})
        })
 
    })

// router.post('/addUser',)
router.post('/addBranchAdmin',(req,res)=>{
    // let {mobile,password}=req.body;
    // mobile:req.body.mobile,
    // password:req.body.password,
    // roleUser:'adminBranch',
 branchModel.findOneAndUpdate({_id:req.body.branchID},{adminBranch:req.body.adminBranchID},{upsert:true})
    .then((data)=>{
        if(data){
            res.json(data)
        }
    })
       
    
       
});

router.post('/addBasePoint',(req,res)=>{
    let basePoint =req.body.basePoint;
    let basePrice=req.body.basePrice

    pointModel.findOneAndUpdate({constant:1},{$set:{basePoint,basePrice}})
        .then((data)=>{
          res.json(data)

        }).catch((err)=>{
            res.json(err)
        })
   
});
router.get('/pointsOrderManyBranch',(req,res)=>{
    PointsBranchModel.find({})
        .then((data,err)=>{
            if(data){
              res.json(data)
            }
            else if(err){
                console.log(err);

            }
        })
})
router.post('/pointsOrderManyBranch',(req,res)=>{

    let {NumberBranch,point,isMontlyLottery,isYearlyLottery}=req.body;
   PointsBranchModel.findOneAndUpdate({NumberBranch,point},{$set:{NumberBranch,point,isMontlyLottery,isYearlyLottery}},{upsert:true})
   .then((data,err)=>{
       if(data){
        console.log(data)
       }
       else if(err){
           console.log(err)

       }
     
   });
})

router.get('/getBasePoint',(req,res)=>{
    pointModel.findOne({})
        .then((data)=>{
            if(data){
                res.json(data);
            }
        })
})
    
router.get('/deletePointOrderManyBranch/:id',(req,res)=>{
    let id=req.params.id;
    PointsBranchModel.findOneAndDelete({_id:id})
        .then((data)=>{
            console.log(data);
            res.redirect(Keys.frontendUrl+'/admin/pointsOrderOtherBranch');
        })
})

//add min point needed for montly/yearly lottery
router.post('/addLotteryOption',(req,res)=>{
    let {montlyMinPoint,yearlyMinPoint}=req.body;
    pointModel.findOneAndUpdate({constant:1},{$set:{minPointForMontlyLottery:montlyMinPoint,minPointForYearlyLottery:yearlyMinPoint}})
        .then((data)=>{
            if(data){
                res.json(data)
            }
        })

    
})
 
//report order  branchs
 router.post('/report/orderBranch',(req,res)=>{
     let {branchID}=req.body;

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
     let fromDateMili=Helper.MiladiToMilisecond(Helper.ToMiladi(fromDate));
     let toDateMili=Helper.MiladiToMilisecond(Helper.ToMiladi(toDate));


     
   orderModel.find({branchID,orderDate:{$lte:toDateMili,$gte:fromDateMili}})
   .then((data)=>{
      if(data){
          console.log(data)
         res.json(data)
      }
      
     
   }).catch((err)=>{
     res.json(err)
   })

 })

 router.get('/getBranchs',(req,res)=>{
     branchModel.find({})
        .then((data)=>{
            
            if(data){
                res.json(data)
            }
        })
 })


 router.get('/dashboard/countOfBranches',(req,res)=>{
    branchModel.aggregate([
        {$group:{_id:'$branchName'}},
        {$count:'countBranches'}
    ]).exec((err,loc)=>{
        if(loc){
            loc.map(item=>{
                res.json({'count':item.countBranches})
            })
        }
    })
 })

 router.get('/dashboard/sumOfOrders',(req,res)=>{
//      orderModel.aggregate([
//          {$group:{_id:'$userID'}},
//          {total:{$sum:'$orderPrice'}}
//      ]).exec((err,loc)=>{
//          if(loc){
//              loc.map(item=>{
//                  res.json({sumOrderPrice:item.total})
//              })
//          }
//      })
 })


 router.post('/getUsersLottery',(req,res)=>{
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
     LotteryUsersModel.find({})

            .then((data)=>{
                if(data){
                    res.json(data);
                    // res.json(data.fromDate)
                   
                    // res.json(Helper.MilisecondToMiladi(data.fromDate))
                }
            })
 })
module.exports=router;