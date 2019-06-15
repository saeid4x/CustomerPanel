import React,{Component} from 'react';
import MainLayout from './mainLayout';
import Helper from '../Controller/Helper';
 import Keys from '../config/keys'
import Axios from 'axios';
// import { isRegExp } from 'util';
import Header from './General/Header'
import "../StaticFiles/css/General/Login.css"

 
 


export default class extends Component{
    constructor(props){
        super(props);
        // this.handleSubmit=this.handleSubmit.bind(this);
    }
   state={
        verifyCode:null,
        mobile:null,
        isExistUser:null,
        mobileErrorMsg:null
    }
    /*
    // <--get mobile number 

    // --> [userID,isFormRegisterComplete, isVerify, roleUser]




    */

    handleChange=(e)=>{
       if(!this.mobile.value){
        this.setState({
            mobileErrorMsg:null
        })
       }else if(!Helper.validation(this.mobile.value,Keys.pattern.mobile)){
            this.setState({
                mobileErrorMsg:'لطفا یک شماره موبایل معتیر وارد کنید'
            })

        }
        else if(Helper.validation(this.mobile.value,Keys.pattern.mobile)){
            this.setState({
                mobileErrorMsg:null
            })
        }

    }
    handleSubmit=(e)=>{
        e.preventDefault();
        if(this.mobile.value){
            if(Helper.validation(this.mobile.value,Keys.pattern.mobile)){
                localStorage.setItem('mobile',this.mobile.value);
               
                //******************************************* */
                Axios.get(Keys.backendUrl+'api/getUser/'+this.mobile.value)
                    .then((data)=>{
                        if(data){
                            
                            console.log('650',data.data);
       // --> get [userID,isFormRegisterComplete, isVerify, roleUser]
                            localStorage.setItem('userID',data.data._id);
                            localStorage.setItem('roleUser',data.data.roleUser);
                            localStorage.setItem('isFormRegisterComplete',data.data.isFillCompleteRegistration);
                            localStorage.setItem('isVerify',data.data.isVerifiedMobile);
                        }
                        else if(data.data.err){
                            console.log('650',data.data.err)
                        }

                    })



                // *********************************************


        
                this.setState({
                    mobile:this.mobile.value,
                    mobileErrorMsg:null
                })
                 let data={
                     mobile:this.mobile.value
                 }
                //*******    */
         
                // check if verified mobile
                Axios.post(Keys.backendUrl+'api/checkActiveUser',data)
                  
                 .then((data)=>{
                     console.log('@00',data.data.status);
                     if(data.data.status == 'verify'){
                         
                         //redirect user to password page
                         this.setState({
                            isActiveUser:true
                        })
                       this.props.history.push('/login/password');
                     
                     }
                     else if(data.data.status == 'no-verify'){
                         //generate verify code 
                        
                         Axios.get(Keys.backendUrl+'api/generateVerifyCode')
                              
                             .then((data)=>{
                                 console.log('@001',data.data)
                                 this.setState({
                                     verifyCode:data.data
                                 })
                                 this.props.history.push('/user/verifyCode')
                                 
         
                             }).then(()=>{
                                 //just assign verifyCode to user
                                 let data={
                                     mobile:localStorage.getItem('mobile'),
                                     verifyCode:this.state.verifyCode
                                 }
                                 Axios.post(Keys.backendUrl+'api/assignVerifyCodeToUser',{data});
                                 
                                   

                             })
                            //  .then(()=>{
                            //     //  //initialize user 
                                 
                            //     //  let data={
                            //     //      mobile:this.mobile.value,
                            //     //      verifyCode:this.state.verifyCode
                            //     //  }
                            //     //  Axios.post(Keys.backendUrl+'api/initialUser',data)
                                  
                            //     //    .then((data)=>{
                            //     //        if(data.data){
                            //     //          if(data.data.result){
                            //     //              //user succssfully initialed 
                            //     //              console.log('user successfuly initialed ',data.data.result._id);
                            //     //              localStorage.setItem('mobile',this.mobile.value);                                            //  localStorage.setItem('userID',data.data)
                            //     //              localStorage.setItem('userID',data.data.result._id);  
                            //     //              //  localStorage.setItem('userID',data.data)
                            //     //              // localStorage.setItem('mobile',this.mobile.value)
                            //     //              //go to verifyCode Page
                            //     //           this.props.history.push(`/user/${this.mobile.value}/verifyCode`)
         
                            //             //  }
                            //             //  else if( data.data.err){
                            //             //      //user initialize failed
                            //             //      console.log('user initialize failed');
           
                            //             //  }
                            //             //  else{
                            //             //      console.log('initialiez user= not fetch');
                            //             //  }
         
                            //     //        }
                                      
                            //     //    })
                                   
                                   
                            //        .catch((err)=>{
                            //            console.log('something wrong with run fetch initial user',err)
                            //        })
                            //  })
                         
         
                     }
                     else if(data.data.status == 'no-user'){
                         //go to verifyCode page
                         // localStorage.setItem('mobile',this.mobile.value)
                        this.props.history.push('/login');
         
         
                          
                     }
                    //  else if(!data.data.result ){
                    //  //    generate verifyCode
                    //      var verifyCode;
                    //      Axios.get(Keys.backendUrl+'api/generateVerifyCode')
                              
                    //          .then((data)=>{
                    //              if(data.data && typeof data.data==Number){
                    //                  verifyCode=data.data;
                    //                 //  console.log('verifyCode=',verifyCode);

                                     
         
         
                    //              }
                    //          }).then(()=>{
                    //              //initial user 
         
                    //          }).then(()=>{
                    //              //check verifyCode user
                    //          })
         
                    //      this.setState({
                    //          isExistUser:false,
                    //          mobileErrorMsg:null

                    //      })
         
                    //  }
                     
                 })
                 
            }
            else{
                //form validation failed
                this.setState({
                    mobileErrorMsg:'لطفا یک شماره موبایل معتبر وارد کنید'
                })
        }
       
        }
    


      
    }
    componentDidMount(){
        // console.log('600', localStorage.getItem('mobile'));
        // if(localStorage.getItem('mobile')){
        //     this.props.history.push('user/dashboard')


    }
    render(){
        return(
            <section className="login">
                <Header/>
                <MainLayout/>
                <section className="loin-content container">
                    <h4>ورود به حساب</h4>
                    <hr/>
                    <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="mobile">نام کاربری یا موبایل</label>
                        <input type="text" className="form-control" defaultValue={localStorage.getItem('mobile')!='null' ?localStorage.getItem('mobile'):''} name="mobile" ref={(val)=>{this.mobile=val}}
                               onChange={this.handleChange} /> 
                    </div>
                    <div style={{color:'red'}}>{this.state.mobileErrorMsg}</div>
                    <button type="submit" className="btn btn-primary">تایید</button>
                    </form>
                   
                </section>


            </section>
        )
    }
}