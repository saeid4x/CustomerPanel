import React ,{Component} from 'react';
import  axios from 'axios';
import Keys from '../../config/keys';
import "../../StaticFiles/css/Customer/ReportBranchSpec.css";
import {
    DatePicker, 
    DateRangePicker,     
  } from "react-advance-jalaali-datepicker";
import Header from '../General/Header';
import Helper from '../../Controller/Helper'
import CardTowRow from '../General/CardTowRow';
import SideNav from './SideNav';
 


export default class extends Component{
   
    state={       
        data:[],
        fromDate:null,
        toDate:null,
        showDateSelected:'none',
        totalPrice:null
       
        
       
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
       
        var formData={
            fromDate:this.state.fromDate,
            toDate:this.state.toDate,
        };

        var  branchID=localStorage.getItem('BranchID');
        // var branchIDMock='5cf7a931e8055f1434b94a50';
       
        axios.post(Keys.backendUrl+'api/adminBranch/report/'+branchID,formData)
            .then((data)=>{
                
                
                if(data){
                    this.setState({
                        data:data.data
                    })
                
                }
            }).then(()=>{
                console.log(this.state.data.length)

            }).then(()=>{
                axios.post(Keys.backendUrl+'api/adminBranch/report/'+branchID+'/otherInfo',formData)
                    .then((data)=>{
                        if(data.data){
                            //
                            // console.log('@200',data.data.data.totalPrice)
                            this.setState({
                                totalPrice:data.data.data.totalPrice
                            })
                        }
                    })
            }).then(()=>{
                //get count of customer
                axios.get(Keys.backendUrl+'api/adminBranch/report/'+branchID+'/getCustomerCount')
                    .then((data)=>{
                        if(data.data){
                            // console.log('@301',data.data.customerCount)
                            this.setState({
                                customerCount:data.data.customerCount
                            })
                        }
                    })

            })
            .catch((err)=>{
                console.log('fetch error');
            }); 

        //**************************************************************** */
      
       

    }
    
    render(){
        

 
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
            <section className="reportOrder">

<Header/>
<SideNav/>
<section className="container">
    <center>
                <h2>گزارش خرید از شعبه های مختلف </h2>
                </center>
                <hr/>
                <div className="form-group">
                <form onSubmit={this.handleSubmit}>
           
                <br/>
                <div className="form-group">
                    <h3 style={{float:'right'}}>تاریخ</h3><br/><br/>
            <section style={{float:'right',marginRight:100}}>
                    <DateRangePicker
                        placeholderStart="تاریخ شروع"
                        placeholderEnd="تاریخ پایان"
                        format="jYYYY/jMM/jDD"
                        onChangeStart={this.change}
                        onChangeEnd={this.changeTimeDate}
                        idStart="rangePickerStart"
                        idEnd="rangePickerEnd"
                   />
                   </section>
                </div>
                <button type="submit" className="btn btn-primary">تایید</button>

                </form>
                </div>
                <hr/>
                <div>
                    {/* <h4 style={{color:'green'}}>date from {this.state.fromDate} to {this.state.toDate}</h4> */}

                </div>

                <div style={{display:`${this.state.showDateSelected}`}} className="completeReport-dateSelected">
                    <h4> گزارش از تاریخ: {this.state.fromDate} تا تاریخ  {this.state.toDate}</h4>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-3 col-sm-3 col-md-3 col-lg-3">
                    <CardTowRow cardValue={!this.state.data.length ? '----':this.state.data.length }  cardTitle='تعداد سفارش  ها'/>

                    </div>
                    <div className="col-3 col-sm-3 col-md-3 col-lg-3">
                    <CardTowRow cardValue={!this.state.totalPrice ? '----':this.state.totalPrice}  cardTitle='مبلغ سفارشات'/>

                    </div>
                    <div className="col-3 col-sm-3 col-md-3 col-lg-3">
                    <CardTowRow cardValue={!this.state.customerCount ? '----': this.state.customerCount}  cardTitle='تعداد مشتریان شعبه'/>

                    </div>
     

                </div>
                <br/>
                {/* <table className="DetailsTable-table"> */}
                <table className="table  bg-primary DetailsTable-table">
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
                </section>

            </section>
        )
    }
}