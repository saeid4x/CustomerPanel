import React,{Component} from 'react';
import axios from 'axios';
import Keys from '../../config/keys';
import Header from '../General/Header';
import "../../StaticFiles/css/AdminBranch/AddUser.css"
import SideNav from './SideNav'

export default class extends Component{
    state={
        userMobile:null
    }
    handleSubmit=(e)=>{
        e.preventDefault();
       
        let formData={
            mobile:this.mobile.value
        }
        axios.post(Keys.backendUrl+'api/adminBranch/order/findOrAddUser',formData).
            then((data)=>{
                if(data){
                    console.log(data.data);
                    let id=data.data._id
                    this.props.history.push('/adminBranch/addOrder/'+id+'/'+this.state.userMobile);
                }
            })


    }
    render(){
        return(
            <section className="adminBranch-adduser">
                <Header/>
                <SideNav/>
                <section className="adminBranch-adduser-content">
               <center> <h1>انتخاب کاربر</h1></center>
                <hr/>
                <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="">کاربر(موبایل)</label>
                    <input type="text" className="form-control" ref={(val)=>{this.mobile=val}}/>

                </div>
                <button type="submit" className="btn btn-primary">تایید</button>

                </form>
                </section>

            </section>
        )
    }
}