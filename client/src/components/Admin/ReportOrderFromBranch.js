import React, { Component } from "react";
// import AdminLayout from "./AdminLayout";
import Keys  from '../../config/keys';
import Helper  from '../../Controller/Helper';
import axios from 'axios';
import {
  DatePicker, 
  DateRangePicker,     
} from "react-advance-jalaali-datepicker";
import Header from '../General/Header';
import SideNav from './SideNav'
import "../../StaticFiles/css/Admin/ReportOrderOtherBranch.css";



export default class extends Component {

state={
  fromDate:null,
  toDate:null,
   branchInfo:[],
   selectBranch:null,
   orderInfo:[],
   showTable:'none'
}

  DatePickerInput(props) {
    return <input className="popo" {...props} />;
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


  handleSubmit=(e)=>{
    e.preventDefault();

    let formData={
      branchID:this.selectBranch.value,
      fromDate:this.state.fromDate,
      toDate:this.state.toDate
     }
     axios.post(Keys.backendUrl+'api/admin/report/orderBranch/',formData)
        .then((data)=>{
          this.setState({
            orderInfo:data.data,
            showTable:'block'
          })
        })
 
  }

componentDidMount(){
  //get branch info 
  axios.get(Keys.backendUrl+'api/admin/getBranchs')
    .then((data)=>{
      if(data){
        console.log('600',data.data)
        this.setState({
           branchInfo:data.data

        })

      }
    })

}

  render(){
    let data=this.state.branchInfo.length ? (
        this.state.branchInfo.map(item=>(
            <option value={item._id}>{item.branchName}</option>
        ))
    ):null

//    let BranchName=this.state.BranchNameRelatedUser ?(
//     this.state.BranchNameRelatedUser.map(item=>(
//         <option>



//          </option>
//     ))
//    ):null;


   let number=1;
   let tableInfo=this.state.orderInfo.length ? (
       this.state.orderInfo.map(item=>(
           <tr>
                   <td> {number++} </td>
                   <td>{item.orderName } </td>
                   <td>{item.orderPrice} </td>
                   <td> {item.branchName} </td>
                   <td>  {Helper.ToShamsi(Helper.MilisecondToMiladi(item.orderDate))}  </td>
                   <td>  {item.orderTime}  </td>
                   <td>  {item.orderPoint}  </td>
           </tr>
       ))
   ):null;
   
    
    return(
        <section className="ReportBranchSpec">
          <Header/>
          <SideNav/>
      <section className="ReportBranchSpec-content">

<center>
            <h2>گزارش خرید از شعبه های مختلف </h2></center>
            <hr/>
            <div className="filter-area">
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label htmlFor="selectBranch">انتخاب شعبه </label>
                <select name="selectBranch" className="form-control" ref={(val)=>{this.selectBranch=val}}>
                    {data}
                </select>

            </div>
            
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

            </form>
            </div>
            <hr/>
            <div className="ReportBranchSpec-dateSelect">

                <h4 style={{color:'#4e342e'}}>  تاریخ از {this.state.fromDate} تا {this.state.toDate}</h4>
            </div>
            <hr/>
            <section className="container " style={{display:`${this.state.showTable}`}}>
            <table className=" table table-hover table-striped bg-primary">
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
        </section>
    )
}
}
