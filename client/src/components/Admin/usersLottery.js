import React ,{Component} from 'react';
import Header from '../General/Header';
import SideNav from './SideNav'
import Keys  from '../../config/keys';
import Helper  from '../../Controller/Helper';
import axios from 'axios';
import {
  DatePicker, 
  DateRangePicker,     
} from "react-advance-jalaali-datepicker";
import CardTowRow from '../General/CardTowRow';
 

export default class extends Component{
    DatePickerInput(props) {
        return <input className="popo" {...props} />;
      }
    state={
        fromDate:null,
        toDate:null,
        lotteryUsers:[],
        mobile:null

    }
    
    change=(unix,formatted)=>{
        this.setState({
            fromDate:formatted,
            
        })
    }
    changeTimeDate=(unix,formatted)=>{
        this.setState({
            toDate:formatted
        })
    }
    useridToMobile=(userID)=>{
        axios.get(Keys.backendUrl+'api/'+userID+'/getUser')
            .then((data)=>{
                if(data){
                     console.log( data.data.userInfo.mobile)
                }
            })

    }
    handleSubmit=(e)=>{
        e.preventDefault();
        let data={
            fromDate:this.state.fromDate,
            toDate:this.state.toDate
        }
        // axios.post(Keys.backendUrl+'api/admin/getUsersLottery',data)
        //     .then((data)=>{
        //         if(data.data){
        //             console.log('@5049',data.data)
        //             this.setState({
        //                 lotteryUsers:data.data
        //             })
                    
        //         }
        //     }).then(()=>{
        //         console.log('@5051',this.state.lotteryUsers.length)
        //     })
            
    
    }
    componentWillMount(){
        axios.post(Keys.backendUrl+'api/admin/getUsersLottery')
        .then((data)=>{
            if(data.data){
                console.log('@5049',data.data)
                this.setState({
                    lotteryUsers:data.data
                })
                
            }
        }).then(()=>{
            console.log('@5051',this.state.lotteryUsers.length)
        })
    }
    componentDidMount(){
    //  let mobile=this.useridToMobile('5d02634b908e10d66e6caf71');
    // let userID='5d02634b908e10d66e6caf71';
    // let mobile;
    // axios.get(Keys.backendUrl+'api/'+userID+'/getUser')
    // .then((data)=>{
    //     if(data){
    //          console.log( data.data.userInfo.mobile);
    //          mobile=data.data.userInfo.mobile;
    //     }
    // })
    //  console.log('@5050',mobile)
    // }
    }
    
    render(){
        let number=1;
        let data=this.state.lotteryUsers.length ? (
            this.state.lotteryUsers.map(item=>(
                <tr>
                <td>{number++} </td>
                <td>   {item.userMobile}</td>
                <td> {Helper.ToShamsi(Helper.MilisecondToMiladi(item.fromDate))} </td>
                <td> {Helper.ToShamsi(Helper.MilisecondToMiladi(item.toDate))}   </td>
                <td> {item.lotteryType=='yearly' ?'سالیانه':'ماهیانه'}</td>
                </tr>

             ))
        ):null;
        return(
            <section className="usersLottery">
                <Header/>
                <SideNav/>
                <section className="usersLottery-content">
                <center><h3>کاربران ثبت شده در قرعه کشی</h3></center>
            {/* <form onSubmit={this.handleSubmit}>
         
         
            <hr/>
            <div className="form-group">
                <h3 style={{float:'right'}}>تاریخ</h3><br/><br/>

                <DateRangePicker
                    placeholderStart="تاریخ شروع"
                    placeholderEnd="تاریخ پایان"
                    format="jYYYY/jMM/jDD"
                    onChangeStart={this.change}
                    onChangeEnd={this.changeTimeDate}
                    idStart="rangePickerStart"
                    idEnd="rangePickerEnd"
               />
                
            </div>
            <center>
            <button type="submit" className="btn btn-primary" >تایید</button>
            </center>

            </form> */}
            <hr/>
            <table className=" text-white table-hover table   bg-primary">
                <tr>
                <th> #</th>
                <th>کاربر </th>
                <th>تاریخ شروع </th>
                <th> تاریخ پایان  </th>
                <th>    نوع قرعه کشی</th>
            
            
                </tr>
                 {data}
                
            </table>


          

                </section>


            </section>
        )
    }
}