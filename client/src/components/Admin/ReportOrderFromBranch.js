import React, { Component } from "react";
// import AdminLayout from "./AdminLayout";
import Keys  from '../../config/keys';
import axios from 'axios';
import {
  DatePicker, 
  DateRangePicker,     
} from "react-advance-jalaali-datepicker";


export default class extends Component {

state={
  fromDate:null,
  toDate:null,
   branchInfo:[],
   selectBranch:null
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
      fromDate:this.state.value,
      toDate:this.state.value
     }
     axios.post(Keys.backendUrl+'api/admin/report/orderBranch/'+formData.branchID
      +'/'+formData.fromDate+'/'+formData.toDate)
        .then((data)=>{
          console.log(data.data)
        })


     console.log(formData)
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


  //  let number=0;
  //  let tableInfo=this.state.data.length ? (
  //      this.state.data.map(item=>(
  //          <tr>
  //                  <td> {number+1} </td>
  //                  <td>{item.orderName } </td>
  //                  <td>{item.orderPrice} </td>
  //                  <td> {item.branchName} </td>
  //                  <td>  {item.orderDate}  </td>
  //                  <td>  {item.orderTime}  </td>
  //                  <td>  {item.orderPoint}  </td>
  //          </tr>
  //      ))
  //  ):null;
   
    
    return(
        <section className="ReportBranchSpec container">


            <h2>گزارش خرید از شعبه های مختلف </h2>
            <hr/>
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label htmlFor="selectBranch">انتخاب شعبه </label>
                <select name="selectBranch" className="form-control" ref={(val)=>{this.selectBranch=val}}>
                    {data}
                </select>

            </div>
            <br/>
            <div className="form-group">
                <h3>تاریخ</h3>

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
            <button type="submit" className="btn btn-primary">تایید</button>

            </form>
            <hr/>
            <div>
                <h4 style={{color:'green'}}>date from {this.state.fromDate} to {this.state.toDate}</h4>
            </div>
            <hr/>
            <table className="DetailsTable-table">
                <tr>
                <th> #</th>
                <th>کالا </th>
                <th>قیمت </th>
                <th> شعبه  </th>
                <th>   تاریخ</th>
                <th>   زمان</th>
                <th> امتیاز  </th>
                </tr>
                {/* {tableInfo} */}
                
            </table>
           

        </section>
    )
}
}
