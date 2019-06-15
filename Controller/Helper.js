var moment=require('moment-jalaali');
module.exports={
    GenerateVerifyCode:(min,max)=>{
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;  

    },
    ToMiladi:(date)=>{
      let m=moment(date,'jYYYY/jMM/jDD');
     return m.format('YYYY/MM/DD');

    },
    ToShamsi:(date)=>{
        let m=moment(date,'YYYY/MM/DD');
        return m.format('jYYYY/jMM/jDD');
    },
    MiladiToMilisecond:(date)=>{
        return new Date(date).getTime();

    },
    MilisecondToMiladi:(date)=>{
        let fullDate=new Date(date);
        let Month=fullDate.getMonth()+1
        let dateFormated=fullDate.getFullYear()+'/'+Month +'/'+fullDate.getDate();
        return dateFormated;
    },
     
    CurrentDate:()=>{
        let date=new Date();
        let month=date.getMonth()+1
      return date.getFullYear()+'/'+month+'/'+date.getDate();
        
    },
    CurrentTime:()=>{
        let date=new Date();
         return date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
    },
    EndOfMonth:(myDate)=>{
        let date=new Date(myDate);
    // let FromDate=Helper.ToShamsi(Helper.MilisecondToMiladi(date));

    //next Month
   let currentMonth=date.getMonth();
   let CurrentYear=date.getFullYear();
   let CurrentDay=date.getDate();
   let formatteddata=CurrentYear+'/'+currentMonth+'/'+CurrentDay;
   date2=new Date(formatteddata);

   //set next month
    date2.setMonth(currentMonth+1);
    return date2.getTime();
    },
    EndOfYear:(myDate)=>{
     //   let data=Helper.ToShamsi(Helper.MilisecondToMiladi(Helper.EndOfYear(Helper.ToMiladi('1398/5/10'))));

        let date=new Date(myDate);
        // let FromDate=Helper.ToShamsi(Helper.MilisecondToMiladi(date));
     
       let currentMonth=date.getMonth()+1;
       let CurrentYear=date.getFullYear();
       let CurrentDay=date.getDate();
       let formatteddata=CurrentYear+'/'+currentMonth+'/'+CurrentDay;
       date2=new Date(formatteddata);
        date2.setFullYear(CurrentYear+1);
        return date2.getTime();
    },
    
     
}