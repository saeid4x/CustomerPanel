import React,{Component} from 'react';
import MainLayout from './mainLayout';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Header from './General/Header';
import Keys from '../config/keys';
 

export default class extends Component{
    state={
        mobile:localStorage.getItem('mobile'),
        password:null,
        roleUser:null,
        passwordInput:null,
        isFillCompleteRegistration:null,
        passwordErrorMsg:'none'
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        if(this.password.value && this.state.password){
            if(this.password.value == this.state.password){
console.log('password correct')
                //check user fill register information(field=isFillCompleteRegistration)
                if(this.state.isFillCompleteRegistration && this.state.isFillCompleteRegistration == 1){
                    switch(this.state.roleUser){
                        case 'customer':{
                            //go to customer dashboard
                            console.log('this is customer Dashboard');
                            this.props.history.push('/customer/dashboard');
                      
        
        
                        }
                        break;
                        case 'admin':{
                             //go to admin dashboard
                             console.log('this is admin Dashboard');
                             this.props.history.push('/admin/dashboard');
        
                        }
                        break;
                        case 'adminBranch':{
                             //go to adminBranch dashboard
                             console.log('this is adminBranch Dashboard');
                             this.props.history.push('/adminBranch/dashboard');

        
                        }
                        break;
                    }
                }
                else if(this.state.isFillCompleteRegistration == 0  ){
                     this.props.history.push('/user/register/');
                }
            }else{
                this.setState({
                    passwordErrorMsg:'block'
                })
            }
        }
       

    }

    componentDidMount(){
        // get user info

        let userID=localStorage.getItem('userID');
        // let userID='5cf530279030f728d493f0f5';
        axios.get(Keys.backendUrl+"api/"+userID+'/getUser')
            .then((data)=>{
                if(data.data.userInfo){
                    console.log(data.data.userInfo.roleUser);
                    localStorage.setItem('roleUser',data.data.userInfo.roleUser);
                    this.setState({
                        password:data.data.userInfo.password,
                         roleUser:data.data.userInfo.roleUser,
                         isFillCompleteRegistration:data.data.userInfo.isFillCompleteRegistration,
                    })
                    console.log('isfill form=',data.data.userInfo.isFillCompleteRegistration)
                }
                else if(!data.data.userInfo){
                    
                    console.log('user not found!')
                }
            })

        
    }


    render(){
        return(
            <section className="PasswordEnter">
            <Header/>
                <section className="PasswordEnter-content container">
                  
                        <h4>کلمه عبور </h4>
                        <hr/>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="password">کلمه عبور</label>
                            <input type="password" className="form-control" ref={(val)=>{this.password=val}}/>
                            <div style={{color:'red',float:'right',display:`${this.state.passwordErrorMsg}`} }>پسورد اشتباه است</div>
                            <br/>
                            <button className="btn btn-primary">تایید</button>                            
                        </div>
                    </form>
                    <br/>
                    <hr/>
 

                    </section> 

            </section>
        )
    }
}