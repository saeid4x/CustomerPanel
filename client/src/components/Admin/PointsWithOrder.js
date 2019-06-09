import React , {Component} from 'react';
import axios from 'axios';
import Keys from '../../config/keys';
import Header from '../General/Header';
import SideNav from './SideNav';
import "../../StaticFiles/css/Admin/PointWithOrder.css"
export default class extends Component{

    state={
        basePoint:null,
        basePrice:null
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        let formData={
            basePoint:this.basePoint.value,
            basePrice:this.basePrice.value

        }
        axios.post(Keys.backendUrl+'api/admin/addBasePoint',formData)
            .then((data)=>{
                if(data){
                    console.log('100',data.data)
                }
                else{
                    console.log('101','error')
                }
            }).catch((err)=>{
                console.log(err);
            })



        console.log("form data=",formData);
    }
    componentDidMount(){
        axios.get(Keys.backendUrl+'api/admin/getBasePoint')
            .then((data)=>{
                this.setState({
                    basePoint:data.data.basePoint,
                    basePrice:data.data.basePrice
                })

            })
    }
    render(){
        return(
            <section className="PointsWithOrder">
                <Header/>
                <SideNav/>
                <section className="PointsWithOrder-content">
                    <center><h3>امتیازدهی بر اساس میزان خرید</h3></center>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="basePrice">هر</label>
                        <input type="text" id="basePrice" className="form-control" ref={(input)=>{this.basePrice=input}}/>
                        <span>= ریال خرید</span>
                    </div>
                    <div className="form-group">
                        
                        <input type="text" id="basePoint" className="form-control" ref={(input)=>{this.basePoint=input}}/>
                        <span>امتیاز</span>
                    </div>
                    <button type="submit" className="btn btn-primary"> تایید</button>

                </form>
                </section>
                <hr/>
                {/* <section className="pointWithOrder-detail">
 
                </section> */}
                <section className="pointWithOrder-detailPoint">
                <ul class="list-group">
                    <li class="list-group-item active">  <center>جزییات امتیازدهی</center></li>
                    <li class="list-group-item"> هر {this.state.basePrice} زیال خرید برابر {this.state.basePoint} امتیاز است</li>
                
                </ul>

                </section>
             

            </section>
        )
    }
}