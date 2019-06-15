import React ,{Component} from 'react';
import  axios from 'axios';
import Keys from '../../config/keys';
// import "../../StaticFiles/css/Customer/ReportBranchSpec.css";
import "../../StaticFiles/css/Customer/CompleteReport.css";
import {
    DatePicker, 
    DateRangePicker,     
  } from "react-advance-jalaali-datepicker";
import Header from '../General/Header';
import Helper from '../../Controller/Helper'
import SideNavigation from './SideNavigation';
import CardTowRow from '../General/CardTowRow';
 


export default class extends Component{

    state={       
        data:[],
        fromDate:null,
        toDate:null,
        showDateSelected:'none',
        showDetailsTable:'none',
        userID:localStorage.getItem('userID'),
        totalPrices:null,
        totalPoint:null,
        countOrder:null
        
       
    }

    // change(unix, formatted) {
    //     console.log(unix); // returns timestamp of the selected value, for example.
    //     console.log(formatted); // returns the selected value in the format you've entered, forexample, "تاریخ: 1396/02/24 ساعت: 18:30".
    //   }
      DatePickerInput(props) {
        return <input className="popo" {...props} />;
      }
    
   
    change=(unix,formatted)=>{
        this.setState({
            fromDate:formatted,
            showDateSelected:'block'
           
            
        })
   }
   changeTimeDate=(unix,formatted)=>{
        this.setState({
            toDate:formatted,
            showDateSelected:'block'
             
        })
    }
    componentDidMount(){
       
        
     

    }
    handleSubmit=(e)=>{
        e.preventDefault();
       
        let formData={
            fromDate:this.state.fromDate,
            toDate:this.state.toDate,
         
        };
        // let userID='5cf8ca9d5fca68bc1c721f48';
       axios.post(Keys.backendUrl+'api/customer/'+this.state.userID+'/report/complete',formData)
        .then((data)=>{
            if(data){
                this.setState({
                    data:data.data,
                    showDetailsTable:'block'
                })
            }
        }).then(()=>{

            let filterData={
                userID:this.state.userID,
                fromDate:this.state.fromDate,
                toDate:this.state.toDate
            }

            axios.post(Keys.backendUrl+'api/customer/report/complete/otherInfo',filterData)
                .then((result)=>{

                    if(result.data){
                        console.log(result.data.data.countOrder)
                         
                        this.setState({
                            totalPrices:result.data.data.sumPrice,
                            totalPoint:result.data.data.sumPoint,
                            countOrder:result.data.data.countOrder
                        })

                    }

                }).then(()=>{
                    // console.log('@205',this.state.totalPoint);
                    // console.log('@205',this.state.totalPrices);
                    // console.log('@205',this.state.countOrder);

                })

        })        
        .catch((err)=>{
            console.log(err);
        })
       

    }
    render(){
     
    //    let BranchName=this.state.BranchNameRelatedUser ?(
    //     this.state.BranchNameRelatedUser.map(item=>(
    //         <option>



    //          </option>
    //     ))
    //    ):null;


       let number=1;
       let tableInfo=this.state.data.length ? (
           this.state.data.map(item=>(
               <tr>
                       <td> {number++} </td>
                       <td>{item.orderName } </td>
                       <td>{item.orderPrice} </td>
                       <td> {item.branchName} </td>
                       <td> {`${Helper.ToShamsi(Helper.MilisecondToMiladi( item.orderDate ))}`} </td>
                       
                       <td>  {item.orderTime}  </td>
                       <td>  {item.orderPoint}  </td>
               </tr>
           ))
       ):null;
       
        
        return(
            <section className="ReportBranchSpec">
                <Header/>
                <SideNavigation/>

            <section className="">
                <center><h2>گزارش کامل </h2></center>
                <hr/>
                <form onSubmit={this.handleSubmit}>
               
                <br/>
                <div className="form-group">
                    <div className="CompleteReport-searchSection">
                    <h3>جستجو</h3>
                    <br/>
 <section style={{float:'right',marginRight:50}}>
                    <DateRangePicker
                        placeholderStart="تاریخ شروع"
                        placeholderEnd="تاریخ پایان"
                        format="jYYYY/jMM/jDD"
                        onChangeStart={this.change}
                        onChangeEnd={this.changeTimeDate}
                        idStart="rangePickerStart"
                        idEnd="rangePickerEnd"
                        customClassStart="DateRangePickerStart"
                        customClassEnd="DateRangePickerEnd"
                      
                   />
                   </section>

                    
                </div>
                <button type="submit" className="btn btn-primary">تایید</button>
                </div>
                </form>
                <hr/>
                <div style={{display:`${this.state.showDateSelected}`}} className="completeReport-dateSelected">
                    <h4> گزارش از تاریخ: {this.state.fromDate} تا تاریخ  {this.state.toDate}</h4>
                </div>
                <hr/>
                <div className="row" style={{marginLeft:100}}>
                    <div className="col-3 col-sm-3 col-md-3 col-lg-3">
                    <CardTowRow cardTitle='تعداد کل خریدها' cardValue={!this.state.countOrder ?'----':this.state.countOrder}/>
                    </div>
                    <div className="col-3 col-sm-3 col-md-3 col-lg-3">
                    <CardTowRow cardTitle='مبلغ کل خریدها ' cardValue={!this.state.totalPrices ? '----':this.state.totalPrices}/>
                    </div>
                    <div className="col-3 col-sm-3 col-md-3 col-lg-3">
                    <CardTowRow cardTitle='مجموع امتیازها' cardValue={!this.state.totalPoint ?'----':this.state.totalPoint}/>
                    </div>
                </div>
               
                <center>
                <table className="table table-striped bg-primary completeReport-DetailsTable-table" style={{display:`${this.state.showDetailsTable}`}}>
                    <tr>
                    <th> #</th>
                    <th>کالا </th>
                    <th>قیمت </th>
                    <th> شعبه  </th>
                    <th>   تاریخ</th>
                    <th>   زمان</th>
                    <th> امتیاز  </th>
                    </tr>
                    {tableInfo}
                    
                </table>
                </center>
               
               
                </section>
            </section>
        )
    }
}