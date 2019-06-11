 import React , {Component} from 'react';
 import  axios from 'axios';
 import Keys from '../../config/keys';
import Header from '../General/Header';
import SideNav from '../Admin/SideNav'
import "../../StaticFiles/css/Admin/AddBranchAdmin.css"
export default class extends Component{


    state={
        branchesInfo:[]
    }
    handleSubmit=(e)=>{
        e.preventDefault();

        let formData={
            mobile:this.mobile.value,
            password:this.password.value,
            branchID:this.branchID.value

        }
        console.log('form data',formData)
    // console.log('branch Name=',this.branchID.value)
        axios.post(Keys.backendUrl+'api/admin/addBranchAdmin',formData)
            .then((data)=>{

            });

            // window.location.href=Keys.frontendUrl+"/admin/addBranchAdmin"




    }
    componentDidMount(){
        axios.get(Keys.backendUrl+'api/admin/getBranches')
        .then((data)=>{
            if(data){
                console.log(data.data)
                this.setState({
                    branchesInfo:data.data
                })
            }
        })
    }

    render(){
        let branchData=this.state.branchesInfo.length ?(
            this.state.branchesInfo.map(item=>(
                <option value={item._id}>
                    {item.branchName}

                </option>
            ))
        ):null;
        return(
            <section className="AddBranchAdmin">
                <Header/>
                <SideNav/>
                <section className="AddBranchAdmin-content">
                <form onSubmit={this.handleSubmit}>
           <center>     <h3>   افزودن مدیر شعبه</h3></center>
                <hr/>
                <div className="form-group">
                    <label htmlFor="branchID">نام شعبه</label>
                    <select name="branchID" className="form-control" ref={(val)=>{this.branchID=val}}>
                    {branchData}
                    </select>
                </div>
                    <div  className="form-group">
                        <label htmlFor="mobile"> موبایل مدیر شعبه   </label>
                        <input type="text" className="form-control" id="mobile" placeholder="نام کاربری یا موبایل" ref={(input)=>{this.mobile=input}}/>

                    </div>
                    <div  className="form-group">
                        <label htmlFor="password">     کلمه عبور(اختیاری)  </label>
                        <input type="password" className="form-control" id="password" ref={(input)=>{this.password=input}}/>

                    </div>
                     
                   
                    <button type="submit" className="btn btn-primary">افزودن</button>



                </form>
                </section>

            </section>
        )
    }
}