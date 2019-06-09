module.exports={
    completeRegistration:(mobile,model,data,res)=>{

        //get user by mobile
       model.findOne({mobile:mobile},function(err,result){
           if(result){
          // update user info by data that recived from completeRegisration form
          result.username:data.username;
          result.password: data.password;
          result.mobile:data.mobile;
         result.isVerifiedMobile:1;
           
         result.email :data.email;
          result.roleUser:'customer';
          result.dateCreated:new Date().now();
          result.timeCreated:'13:00';
          result.accountStatus:'active';
          result.save();
           }
       })

    }
}