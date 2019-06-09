import React,{Component} from 'react';
import axios from 'axios';
import Keys from '../../config/keys';
import Header from '../General/Header';
import SideNav from './SideNav';
import "../../StaticFiles/css/Admin/LotteryOption.css"

export default class extends Component{

    handleSubmit=(e)=>{
        e.preventDefault();
        let formData={
            montlyMinPoint:this.montlyMinPoint.value,
            yearlyMinPoint:this.yearlyMinPoint.value

        }
        
        axios.post(Keys.backendUrl+'api/admin/addLotteryOption',formData)
            .then((data)=>{
                if(data){
                    console.log(data.data)
                }
                
            });


    }
    render(){
        return(
            <section className="LotteryOption" >
                <Header/>
                <SideNav/>
                <section className="LotteryOption-content">
               <center> <h3>تنظیمات قرعه کشی</h3></center>
                <hr/>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
              <center> <h5>قرعه کشی ماهیانه</h5> </center> 
                <label for="montlyMinPoint">حداقل امتیاز</label><br/>
                <input type="text" className="form-control"  name="montlyMinPoint" ref={(val)=>this.montlyMinPoint=val}/>
                <span>یا داشتن  مجوز قرعه کشی ماهیانه</span>
                </div>
                <br/>
                <div className="form-group">
                    <center><h5>قرعه کشی سالیانه</h5></center>
                    <label for="minPoint">حداقل امتیاز</label><br/>
                <input type="text" className="form-control"  name="yearlyMinPoint" ref={(val)=>this.yearlyMinPoint=val}/>
                <span>یا داشتن  مجوز قرعه کشی سالیانه</span>
                </div>
                <button type="submit" className="btn btn-primary">تایید</button>
                </form>
                </section>
            </section>
        )
    }
}