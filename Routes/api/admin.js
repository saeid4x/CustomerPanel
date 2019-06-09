var express=require('express')     
    router=express();
var branchModel=require('../../Models/branch');
var userModel=require('../../Models/users');
var pointModel=require('../../Models/points');
var PointsBranchModel=require('../../Models/PointsBranch');
var LotteryModel=require('../../Models/Lottery');
var orderModel=require('../../Models/orders');
var Keys=require('../../config/keys')
var Helper=require('../../Controller/Helper');
 

//initials 
 

router.get('/',(req,res)=>{
    res.send('api-admin');
});

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


router.post('/addBranchAdmin',(req,res)=>{
    // let {mobile,password}=req.body;
    let adminInfo={
        mobile:req.body.mobile,
        password:req.body.password,
        roleUser:'adminBranch',
        branchID:req.body.branchID
    }
    console.log(adminInfo.branchID);
    userModel.findOneAndUpdate({mobile:adminInfo.mobile},{$set:adminInfo},{upsert:true})
        .then((data)=>{
            if(data){
                branchModel.findOneAndUpdate({_id:adminInfo.branchID},{$set:{adminBranch:data._id}})
                    .then((data)=>{
                         res.json(data)
                    })
            }
            else{
                console.log('this user nod defined')
            }
             
        }).catch((err)=>{
            console.log(err)
        })
     
});

router.post('/addBasePoint',(req,res)=>{
    let basePoint =req.body.basePoint;
    let basePrice=req.body.basePrice
    pointModel.findOneAndUpdate({basePoint,basePrice},{basePoint,basePrice},{upsert:true})
        .then((data)=>{
            console.log(data)

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

    LotteryModel.findOneAndUpdate({minPointForMontlyLottery:montlyMinPoint,minPointForYearlyLottery:yearlyMinPoint},
      {$set:{minPointForMontlyLottery:montlyMinPoint,minPointForYearlyLottery:yearlyMinPoint}},
        {upsert:true})
    .then((data)=>{
        if(data){
            console.log('300',data);
            res.json(data);
        }
    });


})
 
//report order  branchs
 router.post('/report/orderBranch',(req,res)=>{
     let {branchID,formDate,toDate}=req.body;


     let fromDataMili=Helper.MiladiToMilisecond(Helper.toMiladi(fromDate));
     let toDataMili=Helper.MiladiToMilisecond(Helper.toMiladi(toDate));


     
   orderModel.find({branchID,orderDate:{$lte:toDateMili,$gte:fromDateMili}})
   .then((data)=>{
      if(data){
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
module.exports=router;