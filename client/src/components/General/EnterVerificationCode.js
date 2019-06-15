import React , {Component} from 'react';
import Helper from '../../Controller/Helper';
import Keys from '../../config/keys';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Header from './Header';
import "../../StaticFiles/css/General/EnterVerifCode.css"


export default class extends Component{
    
    state={
        mobile:null,
        verifyCode:null,
        password:null,
        isFillCompleteRegistration:null,
        changeAccountStatus:false,
        verifiyCodeErrorMsg:null,

    }

    ModifyMobile=(e)=>{
        if(localStorage.getItem('mobile')){
            Axios.get(Keys.backendUrl+'api/removeUser/'+localStorage.getItem('mobile'))
                .then((data)=>{
                    if(data){
                        // console.log(data.data)
                        this.props.history.push('/login')
                    }
                })

        }
    }
    handleChange=(e)=>{
        if(!this.verifCode.value){
         this.setState({
            verifiyCodeErrorMsg:null
         })
        }else if(!Helper.validation(this.verifCode.value,Keys.pattern.verifyCode)){
             this.setState({
                verifiyCodeErrorMsg:'لطفا یک شماره موبایل معتیر وارد کنید'
             })
 
         }
         else if(Helper.validation(this.verifCode.value,Keys.pattern.verifyCode)){
             this.setState({
                verifiyCodeErrorMsg:null
             })
         }
 
     }
    handleSubmit=(e)=>{
        e.preventDefault();

        if(this.verifCode.value){
            if(Helper.validation(this.verifCode.value,Keys.pattern.verifyCode)){
                let verifCodeInput=this.verifCode.value;

                if(verifCodeInput == this.state.verifyCode){
                    console.log('verifyCode is correct');
                    // set accountStatus='active'
                    
                        let data={
                            mobile:this.state.mobile,
                            accountStatus:'active',
                            isVerifiedMobile:1,
                            verifyCode:null
                        }
                       
                        Axios.post(Keys.backendUrl+"api/"+'changeAccountStatus',data)
                       .then((data)=>{
                           if(data.data){
                               this.setState({
                                changeAccountStatus:true
                               })
        
                           }
        
                       });//end fetch
        
        
                     
        
                    if(localStorage.getItem('isFormRegisterComplete') == 0){
                        //go to complete Registration
                        this.props.history.push('/user/register');
                    }
                    else if(localStorage.getItem('isFormRegisterComplete') == 1){
                        //go to password page
                        this.props.history.push('/login/password');
                    }
                    //set isVerifiedMobile equal true(1)
                    //set roll user
                }else{
                    this.setState({
                        verifiyCodeErrorMsg:'کد فعالسازی نامعتبر است'
                    })

                }
                
        

            }
            else{
                this.setState({
                    verifiyCodeErrorMsg:'لطفا یک کد فعالسازی معتبر وارد کنید'
                })
            }
        }
        else{
            //verifuCode field is empty

        }
       

      


    }
componentDidMount(){
let code=sessionStorage.getItem('verifyCode');
    alert()

    //  Axios.get(Keys.backendUrl+'api/getUser/'+localStorage.getItem('mobile'))
    //     .then((data)=>{
    //         if(data.data){
                 
    //             console.log('@200',data.data.verifyCode);
    //             this.setState({
    //                 verifyCode:data.data.verifyCode
    //             })
    //         }
    //         else if(data.data.err){
    //             console.log('@200','somethis wrong')
    //         }
    //     }).then(()=>{
    //         alert('code='+this.state.verifyCode);
    //     })
    
    
    // let data={mobile:localStorage.getItem('mobile')}
    //  Axios.post(Keys.backendUrl+'api/getUser',data)
      
    // .then((data)=>{
    //     if(data){
    //         console.log('3030=',data.data);
    //         alert('code ='+data.data.verifyCode);
    //     // localStorage.setItem('mobile',data.mobile);
    //     localStorage.setItem('password',data.data.password)
    //     localStorage.setItem('roleUser',data.data.roleUser);
            
    //         this.setState({
    //             mobile:this.props.match.params.mobile,
    //             verifyCode:data.data.verifyCode,
    //             password:data.data.password,
    //             isFillCompleteRegistration:data.data.isFillCompleteRegistration,
    //         })
    //     }else{
    //         console.log('data not found');
    //     }
        
    // }).catch((err)=>{
    //     console.log('error fetch',err);
    // });//end fetch

   
}
    render(){
        return(
            <section className="EnterVerifCode">
                <Header/>
                <section className="EnterVerifCode-content">
                    <form onSubmit={this.handleSubmit}>
                 <center>  
                      <h1>کد تایید </h1>
                      <hr/>
                    <input type="text" ref={(input)=>{this.verifCode=input}} onChange={this.handleChange} />
                    <div style={{color:'red'}}>{this.state.verifiyCodeErrorMsg}</div>
                    <br/>
                    <button type="submit" className="btn btn-success">تایید</button>
                    <br/>
                    </center>
                    </form>
                  
                   <center>
                       <div className="enterVerifCode-link">
                    <Link onClick={this.ModifyMobile}  > اصلاح شماره</Link>
                    </div>
                    </center>

                </section>
            </section>
        )
    }
}