var express=require('express'),
    router=express();
var orderModel=require('../../Models/orders');
var userModel=require('../../Models/users');
var pointModel=require('../../Models/points');
var pointModel=require('../../Models/points');
var profileModel=require('../../Models/profile');

var TestModel=require('../../Models/Test');
var Keys=require('../../config/keys')
var cors=require('cors');
var moment=require('moment-jalaali');
var Helper=require('../../Controller/Helper')



 
 
router.get('/',(req,res)=>{
    res.send('api- admin branch')
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
    let {userID,orderName,orderPrice,orderPoint,branchID}=req.body;
    new orderModel({
        userID,
        orderName,
        orderPrice,
        orderPoint,
        branchID,
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

router.get('/:userID/addToLottery/:lotteryType',(req,res)=>{

    let fromDate;
    let toDate;
    switch(req.params.lotteryType){
        case 'montly':{
            fromDate=Helper.MiladiToMilisecond(Helper.CurrentDate());
            toDate=Helper.MiladiToMilisecond(Helper.EndOfMonth(Helper.CurrentDate()));
            
        }
        break;
        case 'yearly':{
            fromDate=Helper.MiladiToMilisecond(Helper.CurrentDate());
            toDate=Helper.MiladiToMilisecond(Helper.EndOfYear(Helper.CurrentDate()));

        }
        break;
    }
    if(fromDate && toDate && userID){
        let data={
            userID:req.params.userID,
            fromDate,
            toDate,
            lotteryType:req.params.lotteryType
            
        }
        LotteryUserModel.findOneAndUpdate({userID:req.params.userID},data,{upsert:true})
            .then((data)=>{
                if(data){
                    res.json(data)
                }
            })

    }
   




})
router.get('/order/getDetailsOrder/:id',(req,res)=>{
    orderModel.find({userID:req.params.id})
        .then((data)=>{
            console.log(data);
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
router.get('/:userID/getTotalPoints',(req,res)=>{
    // let userID=req.params.userID;
    let userID='user120';
    var test= orderModel.aggregate([
        {$match:{userID}} ,
        {$group:{_id:"$userID",count:{$sum:1},total:{$sum:'$orderPoint'}}} 
      ]).exec((err,loc)=>{
          loc.map(item=>{
              res.json(item)
   
          })
          
      });
})

router.get('/:user/profile',(req,res)=>{
    profileModel.findOne({userID:req.params.userID})
        .then((data)=>{
            if(data){
                res.json(data)
            }
            
        })
})


 
router.get('/test/calc1',(req,res)=>{
 

    
    // new TestModel({
    //     name:'saeid 5',
    //     date:'1370/6/02',
    //     goods:'mobile 41'
    // }).save((err,data)=>{
    //     if(data){
    //         console.log(data);
    //         res.json(data);
    //     }})
       

    //     }
    //     else{
    //         console.log(err);
    //         res.json(data);
    //     }
    // });

    
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