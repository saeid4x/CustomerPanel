import React ,{Component} from 'react';
import Keys from '../../config/keys';
import axios from 'axios';
import SideNav from './SideNav';
import Header from '../General/Header';
import "../../StaticFiles/css/Admin/AddBranch.css"

export default class extends Component{

    handleSubmit=(e)=>{
        e.preventDefault();
        let formData={
            branchName:this.branchName.value,
           
        }
 
        axios.post(Keys.backendUrl+'api/admin/addBranch',formData)
            .then((data)=>{
                if(data){
                    console.log(data.data);
                     
                }
               
            });
        
          
    }

    render(){
        return(
            <section className="AddBranch">
                <Header/>
                <SideNav/>
                <div className="">
                
                    <div className="addBranch-content">
                    <center>    <h3>افزودن شعبه</h3></center>
                    <hr/>
                <form onSubmit={this.handleSubmit}>
                    <div  className="form-group">
                        <label htmlFor="branchName">نام شعبه</label>
                        <input type="text" className="form-control" id="branchName" ref={(input)=>{this.branchName=input}}/>
                        
                    </div>
                     
                    
                    <button type="submit" className="btn btn-primary">افزودن</button>

                </form>
                </div>
                </div>
            </section>
        )
    }
}