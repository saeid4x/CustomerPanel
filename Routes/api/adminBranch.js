var express=require('express'),
    router=express();
var orderModel=require('../../Models/orders');
var userModel=require('../../Models/users');
var pointModel=require('../../Models/points');
var LotteryUserModel=require('../../Models/LotteryUsers');
 var profileModel=require('../../Models/profile');
 var branchModel=require('../../Models/branch');
 

var TestModel=require('../../Models/Test');
var Keys=require('../../config/keys')
var cors=require('cors');
var moment=require('moment-jalaali');
var Helper=require('../../Controller/Helper')



 
 
router.get('/',(req,res)=>{
    res.send('api- admin branch')
})

 router.get('/getBranchInfo/:adminBranch',(req,res)=>{
branchModel.findOne({adminBranch:req.params.adminBranch})
    .then((data)=>{
        if(data){
            res.json(data)
        }
        
    }).catch((err)=>{
        res.json(err)
    })
 })

router.post('/order/findOrAddUser',(req,res)=>{
    let mobile=req.body.mobile;
    userModel.findOneAndUpdate({mobile},{$set:{mobile}},{upsert:true}).then(()=>{
        userModel.findOne({mobile})
            .then((data)=>{
                res.json(data)
                console.log('1000',data)
            })
    })
          
    
});
router.post('/order/addOrder',(req,res)=>{
     
    
    let orderDate=Helper.MiladiToMilisecond(Helper.CurrentDate());
    let orderTime=Helper.CurrentTime();
    let orderPoint=req.body.orderPoint;
    // console.log('orderPoint',orderPoint);
    let userID=req.body.customerID;
    let orderName;
    if(!req.body.orderName){
        orderName='نامشخص';
    }
    else{
        orderName=req.body.orderName;
    }
    let {orderPrice,BranchID,BranchName}=req.body;

    //@@branchName
    new orderModel({
        userID,
        orderName,
        orderPrice,
        orderPoint,
        branchID:BranchID,
        branchName:BranchName,
        orderDate,
        orderTime
    }).save((err,data)=>{
        if(data){

            // res.redirect(Keys.frontendUrl+'/adminBranch/addOrder/'+userID)
            res.json(data)
            
        }
        else if(err){
            console.log(err)
             

        }
    });// end insert data
})

router.post('/:customerID/addToLottery',(req,res)=>{


    // let data=Helper.ToShamsi(Helper.MilisecondToMiladi(Helper.EndOfMonth(Helper.ToMiladi('1398/5/10'))))
    var fromDate;

    var toDate;
    var mobile=req.body.mobile;
    var customerID=req.params.customerID;
    // if(customerID){
    //     userModel.findOne({_id:customerID})
    //         .then((data)=>{
    //             if(data){
    //                 localStorage.setItem('customerMobile')
    //             }

    //         })
    // }
    switch(req.body.lotteryType){
        case 'montly':{
            
            fromDate=Helper.MiladiToMilisecond(Helper.CurrentDate());
            toDate=Helper.EndOfMonth(Helper.CurrentDate())         
            console.log('switch from date | toDate',fromDate+'***'+toDate)
            
        }
        break;
        case 'yearly':{
            fromDate=Helper.MiladiToMilisecond(Helper.CurrentDate());
            toDate=Helper.EndOfYear(Helper.CurrentDate())  

        }
        break;
    }
    console.log('from dtae',fromDate);
    console.log('to dtae',toDate);
    var data={
        userID:req.params.customerID,
        fromDate,
        toDate,
        lotteryType:req.body.lotteryType,
        userMobile:mobile
        
    }

    
        // console.log('@207',data);
        LotteryUserModel.findOneAndUpdate({userID:req.params.customerID},data,{upsert:true})
            .then((data)=>{
                if(data){
                    res.json(data)
                }
            }).catch((err)=>{
                res.json(err)
            })
})
router.post('/report/:branchID',(req,res)=>{

    var branchID=req.params.branchID;
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
   
   
   orderModel.find({branchID,orderDate:{$lte:toDateMili,$gte:fromDateMili}})
      .then((data)=>{
         if(data){
            res.json(data)
         }else{
             res.json('error')
         }
         
        
      }).catch((err)=>{
        res.json(err)
      })
})

router.post('/report/:branchID/otherInfo',(req,res)=>{

    
   var fromDate;
   var toDate;
   let branchID=req.params.branchID;
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
      {$match:{branchID,orderDate:{$gte:fromDateMili,$lte:toDateMili}}},
      {$group:{_id:'$branchID',totalPrice:{$sum:'$orderPrice'}}}
   ]).exec((err,loc)=>{
       
      if(loc){
         loc.map(item=>{
            let data={
            totalPrice:item.totalPrice
            }
             res.json({data,err:false});
       
          })
      }
      else if(err){
         res.json({err:true})
      }
   })
})
router.get('/test6',(req,res)=>{
 

    res.json(toDate);
})

//get customer count that related to one branch
router.get('/report/:branchID/getCustomerCount',(req,res)=>{
    let branchID=req.params.branchID;
    orderModel.aggregate([
        {$match:{branchID}},
        {$group:{_id:'$userID'}},
        {$count:'customerCount'}

    ]).exec((err,loc)=>{
        if(loc){
            loc.map(item=>{
                res.json({customerCount:item.customerCount})
            })
        }
    })
})
router.get('/order/getDetailsOrder/:id',(req,res)=>{
    orderModel.find({userID:req.params.id})
        .then((data)=>{
            // console.log(data);
            res.json(data);
        })
})

router.get('/getPointDefinition',(req,res)=>{
    
    pointModel.findOne({})
        .then((data)=>{
            if(data){
                res.json(data);
            }
        })
})


router.get('/:customerID/getTotalPoints',(req,res)=>{
    
    let customerID=req.params.customerID;
      orderModel.aggregate([
        {$match:{userID:customerID}} ,
        {$group:{_id:"$userID",count:{$sum:1},totalPoint:{$sum:'$orderPoint'}}} 
      ]).exec((err,loc)=>{
          loc.map(item=>{
              res.json(item)
   
          })
          
      });
})



//get dashboard info
router.get('/:branchID/getDashboardInfo',(req,res)=>{    
    //get count of order based-branchID
    //get sum of orders based-branchID
   var test= orderModel.aggregate([
      {$match:{branchID:req.params.branchID}} ,
      {$group:{_id:"$branchID",count:{$sum:1},totalPrice:{$sum:'$orderPrice'}}}
    ]).exec((err,loc)=>{
        loc.map(item=>{
         res.json({totalPrice:item.totalPrice,count:item.count});
        })
        
    });


})

//get count customers of one branch
router.get('/:branchID/countOfCustomer',(req,res)=>{
    orderModel.aggregate([
        {$match:{branchID:'branchID 20'}},   
        {$group:{_id:'$userID'}},      
          {$count:'customerCount'}
     ]).exec((err,loc)=>{
         console.log(loc)
         loc.map(item=>{
            res.json({customerCount:item.customerCount})
         })
    
        //  res.json(loc)
     })
})
router.get('/:user/profile',(req,res)=>{
    profileModel.findOne({userID:req.params.userID})
        .then((data)=>{
            if(data){
                res.json(data)
            }
            
        })
})


 
router.get('/test/5',(req,res)=>{
 orderModel.aggregate([
    {$match:{branchID:'branchID 20'}},   
    {$group:{_id:'$userID'}},      
      {$count:'customerCount'}
 ]).exec((err,loc)=>{
     console.log(loc)
     loc.map(item=>{
        //  console.log(item.)
     })

    //  res.json(loc)
 })
    
})
router.get('/test/20',(req,res)=>{
    new pointModel({
        basePoint:2,
    basePrice:1000,
    minPointForMontlyLottery:15,
    minPointForYearlyLottery:50

    }).save();

 



})

router.post('/test4',(req,res)=>{
   var test= orderModel.aggregate([
     {$match:{userID:'user120'}} ,
     {$group:{_id:"$userID",count:{$sum:1},total:{$sum:'$orderPoint'}}} 
   ]).exec((err,loc)=>{
       loc.map(item=>{
           res.json(item.total)

       })
       
   });
    
})
 
// router.get('/test/add',(req,res)=>{
//     new orderModel({
//         userID:'user#120',
//         orderName:'order 1',
//         orderPrice: 500000,
//         orderDate:'1389/20/20',
//         orderTime:'12:20',
//         branchID: 'branchID 20',
//         orderPoint:00,

//     }).save((data,err)=>{
//         if(data){
            
//             console.log(data);
//             res.json(data)
//         }
//         else if(err){
//             console.log(err);
//             res.json(err)

//         }
//     });
    
// })


module.exports=router;