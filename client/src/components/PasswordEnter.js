import React,{Component} from 'react';
import MainLayout from './mainLayout';
import {Link} from 'react-router-dom';


export default class extends Component{
    state={
        mobile:localStorage.getItem('mobile'),
        password:localStorage.getItem('password'),
        roleUser:localStorage.getItem('roleUser'),
        passwordInput:null
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        if(this.password.value == this.state.password){

            switch(this.state.roleUser){
                case 'customer':{
                    //go to customer dashboard
                    console.log('this is customer Dashboard')


                }
                break;
                case 'admin':{
                     //go to admin dashboard
                     console.log('this is admin Dashboard')

                }
                break;
                case 'adminBranch':{
                     //go to adminBranch dashboard
                     console.log('this is adminBranch Dashboard')

                }
                break;
            }

            

            
        }





        
        
    }
    render(){
        return(
            <section className="PasswordEnter">
                <section className="PasswordEnter-content container">
                
                        <h4>کلمه عبور </h4>
                        <hr/>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="password">کلمه عبور</label>
                            <input type="password" className="form-control" ref={(val)=>{this.password=val}}/>
                            <br/>
                            <button className="btn btn-primary">تایید</button>                            
                        </div>
                    </form>
                    <br/>
                    <hr/>
                    <Link to="/login/forgotPassword">کلمه عبور را فراموش کردم</Link>


                    </section> 

            </section>
        )
    }
}