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
 


export default class extends Component{

    state={       
        data:[],
        fromDate:null,
        toDate:null,
        showDateSelected:'none'
        
       
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
        let userID=localStorage.getItem('userID');
        axios.get(Keys.backendUrl+'api/customer/'+userID+'/report/branchRelatedOrderUser')
            .then((data)=>{
                
                if(data){
                    this.setState({
                        data:data.data
                    })
                
                }
            }).then(()=>{
                console.log('100',this.state.data)
            })
            .catch((err)=>{
                console.log('fetch error');
            })


    }
    handleSubmit=(e)=>{
        e.preventDefault();
       
        let formData={
            fromDate:this.state.fromDate,
            toDate:this.state.toDate,
            selectBranch:this.selectBranch.value
        };
        let userID=localStorage.getItem('userID');
        axios.post(Keys.backendUrl+'api/customer/'+userID+'/report/branchRelatedOrderUser',formData)
            .then((data)=>{
                if(data){
                    console.log('250',data.data)
                    this.setState({
                        data:data.data
                    })
                }
            })





        console.log(formData)
       

    }
    render(){
        let data=this.state.data.length ? (
            this.state.data.map(item=>(
                <option value={item.branchID}>{item.branchName}</option>
            ))
        ):null

    //    let BranchName=this.state.BranchNameRelatedUser ?(
    //     this.state.BranchNameRelatedUser.map(item=>(
    //         <option>



    //          </option>
    //     ))
    //    ):null;


       let number=0;
       let tableInfo=this.state.data.length ? (
           this.state.data.map(item=>(
               <tr>
                       <td> {number+1} </td>
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
<section className="container">
    <center>
                <h2>گزارش خرید از شعبه های مختلف </h2>
                </center>
                <hr/>
                <div className="form-group">
                <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="selectBranch">انتخاب شعبه </label>
                    <select name="selectBranch" className="form-control" ref={(val)=>{this.selectBranch=val}}>
                        {data}
                    </select>

                </div>
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
                
                {/* <table className="DetailsTable-table"> */}
                <table className="table table-striped DetailsTable-table">
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