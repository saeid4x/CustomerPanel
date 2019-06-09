import Axios from 'axios';
import moment from 'moment-jalaali';
import Keys from '../config/keys'

 export default {
     validation:(field,regex)=>{

        return regex.test(field);
     },
     ToMiladi:(date)=>{
        let  m=moment(date,'jYYYY/jMM/jDD');
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
     }
     
     
 }