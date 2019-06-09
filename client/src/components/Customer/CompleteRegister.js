import React , {Component} from 'react';
import Keys from '../../config/keys';
import Helper from '../../Controller/Helper';
import Axios from 'axios';
import keys from '../../config/keys';
import Header from '../General/Header';
import "../../StaticFiles/css/Customer/CompleteRegister.css"

export default class extends Component{
    state={
        mobile:localStorage.getItem('mobile'),
        isFormRegistered:false,
        usernameErrorMsg:null,
        passwordErrorMsg:null,
        passwordConfirmErrorMsg:null,
        emailErrorMsg:null

    }

    handleUsername=(e)=>{
        if(!this.username.value){
         
            this.setState({
                usernameErrorMsg:'لطفا یک نام کاربری معتبر وارد کنید',
                
            })
        }else{
             
            this.setState({
                usernameErrorMsg:null
                
            })
        }
        
    }

handlePassword=(e)=>{
    if(!this.password.value){
        
        this.setState({
            passwordErrorMsg:'کلمه عبور نمی تواند خالی باشد'
            
        })
    }else if(this.password.value.length <= Keys.minPasswordLength){
        this.setState({
            passwordErrorMsg:'کلمه عبور کوتاه است'
            
        })
    }
    else if(this.password.value && this.password.value.length >Keys.minPasswordLength)
        {
            this.setState({
                passwordErrorMsg:null
            })
            
        }

}
handleConfirmPassword=(e)=>{
    if(!this.passwordConfirm.value){
        
        this.setState({
            passwordConfirmErrorMsg:'کلمه عبور نمی تواند خالی باشد'
            
        })
    }else if(this.passwordConfirm.value.length <= Keys.minPasswordLength){
        this.setState({
            passwordConfirmErrorMsg:'کلمه عبور کوتاه است'
            
        })
    }
    else if(this.password.value != this.passwordConfirm.value){
        this.setState({
            passwordConfirmErrorMsg:'کلمه عبورها با هم مطابقت ندارند'
            
        })


    }else if(this.password.value == this.passwordConfirm.value){
        this.setState({
            passwordConfirmErrorMsg:null
            
        })

    }
    
    else if(this.passwordConfirm.value.length > Keys.minPasswordLength){
        this.setState({
            passwordConfirmErrorMsg:null
            
        })

    } 
    else if(this.passwordConfirm.value && this.password.value.length >Keys.minPasswordLength)
        {
            this.setState({
                passwordErrorMsg:null
            })
            
        }
    
}

handleEmail=(e)=>{
    if(!this.email.value){
        this.setState({
            emailErrorMsg:'ایمیل نمی تواند خالی باشد'
        })

    }
    else if(!Helper.validation(this.email.value,Keys.pattern.email)){
        this.setState({
            emailErrorMsg:'لطفا یک ایمیل معتیر وارد کنید'
        })

    }
    else if(Helper.validation(this.email.value,Keys.pattern.email)){
        this.setState({
            emailErrorMsg:null
        })

    }
    else if (this.email.value){
        this.setState({
            emailErrorMsg:null
        })

    }
}
    handleSubmit=(e)=>{
        e.preventDefault();
       
            if(!this.state.usernameErrorMsg && !this.state.passwordErrorMsg && !this.state.passwordConfirmErrorMsg && !this.state.emailErrorMsg)
            {
                 //send data to db
                 let formData={
                    username:this.username.value,
                    password:this.password.value,
                    mobile:this.state.mobile,                
                    // passwordConfirm:this.passwordConfirm.value,
                    email:this.email.value
                }
                Axios.post(keys.backendUrl+'api/complateRegisteration',formData)
                    .then((data)=>{
                        if(data.data){
                            
                            localStorage.setItem('userID',data.data._id)
                            this.setState({
                                isFormRegistered:true
                            })
                        } 

                    })
                    .then(()=>{
                        if(this.state.isFormRegistered == 1){
                            //show message that form successfuly registered


                            //go to dashboard (default= customer)
                            this.props.history.push('/user/dashboard')

                        }
                    })
                    
                    ;//end fetch

            }
               
            
         
 
    }
    componentDidMount(){
        
        
    }
    render(){
        return(
            <section className="completeRegister">
                <Header/>
                <section className="container completeRegister-content ">
                     
                 <center>   <h2>تکمیل ثبت نام </h2></center><hr/>
                    <form onSubmit={this.handleSubmit}>

                        <div className="form-group">
                            <label htmlFor="username">نام کاربری</label>
                            <input type="text" className="form-control" id="username" onChange={this.handleUsername} placeholder="نام کاربری" ref={(input)=>{this.username=input}}/>
                            <div style={{color:'red'}}>{this.state.usernameErrorMsg}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">کلمه عبور</label>
                            <input type="password" className="form-control" onChange={this.handlePassword} id="password" ref={(input)=>{this.password=input}}/>
                            <div style={{color:'red'}}>{this.state.passwordErrorMsg}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordConfirm"> تکرار کلمه عبور </label>
                            <input type="password" className="form-control" onChange={this.handleConfirmPassword} id="passwordConfirm" ref={(input)=>{this.passwordConfirm=input}} />
                            <div style={{color:'red'}}>{this.state.passwordConfirmErrorMsg}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email"> ایمیل</label>
                            <input type="email" className="form-control" id="email" onChange={this.handleEmail} placeholder="email" ref={(input)=>{this.email=input}}/>
                            <div style={{color:'red'}}>{this.state.emailErrorMsg}</div>

                        </div>

                        <button type="submit" className="btn btn-primary"> ثبت نام</button>


                    </form>
                  
                </section>


            </section>
        )

    }
}