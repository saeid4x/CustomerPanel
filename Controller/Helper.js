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
      return date.getFullYear()+'/'+date.getMonth()+'/'+date.getDate();
        
    },
    CurrentTime:()=>{
        let date=new Date();
         return date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
    },
    EndOfMonth:(date)=>{
        let fullDate=new Date(date);
        let day=fullDate.getDate()+29;
        let Month=fullDate.getMonth()+1
        let dateFormated=fullDate.getFullYear()+'/'+Month +'/'+day;
        return dateFormated;

    },
    EndOfYear:(date)=>{
        let fullDate=new Date(date);
          let newYeay=fullDate.getFullYear()+1;
         let Month=fullDate.getMonth()+1
        let dateFormated=newYeay+'/'+Month +'/'+fulldate.getDate();
        return dateFormated;
    }
    
     
}