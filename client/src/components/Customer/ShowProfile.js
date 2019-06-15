import React,{Component} from 'react';
import Keys from '../../config/keys';
import axios from 'axios'
import Header from '../General/Header';
import "../../StaticFiles/css/Customer/ShowProfile.css"

export default class  extends Component{

    state={
         userID:localStorage.getItem('userID'),
        name:null,
        family:null,
        age:null,
        gender:null,
        address:null,
        avatar:null
    }
    componentDidMount(){
        let userID=localStorage.getItem('userID');

        axios.get(Keys.backendUrl+'api/customer/'+userID+'/getProfile')
            .then((data)=>{
                console.log(data.data)
                if(data){
                    let gender;
                    if(data.data.gender == 'male'){
                        gender='مرد'
                    }else{
                        gender='زن'
                    }
                    this.setState({
                        userID:data.data.userID,
                        name:data.data.name,
                        family:data.data.family,
                        age:data.data.age,
                        gender,
                        address:data.data.address,
                        avatar:data.data.avatar
                    })
                }else{
                    console.log('error')
                }
                
            }).catch((err)=>{
                console.log('error during fetch data',err)
            })
    }

    render(){
        return(
            <section classNameNameName="showProfile ">
                <Header/>
              <center>  <h1>نمایش پروفایل </h1></center>
                <hr/>
           
                <img src={`${Keys.backendUrl}public/uploads/images/${this.state.avatar}`} alt=""/>
                {/* <img src={this.state.avatar} alt=""/> */}
            
            {/* ******************************************************************* */}
            <ul class="list-group showProfile-details3 container">
  <li class="list-group-item active" style={{textAlign:'center'}}>پروفایل</li>
  <li class="list-group-item"> نام = {this.state.name}</li>
  <li class="list-group-item"> نام خانوادگی = {this.state.family}</li>
  <li class="list-group-item"> سن = {this.state.age}</li>
  <li class="list-group-item"> جنسیت = {this.state.gender}</li>
  <li class="list-group-item"> آدرس = {this.state.address}</li>
 
 
</ul>


            {/* ****************************************************************** */}
             

               {/* <div classNameName="showProfile-showProfile">

                   <div classNameName="form-group">
                       <label htmlFor="">نام</label>
                       <span classNameName="" name></span>
                   </div>




               <p>نام=<span classNameName="font-weight-light">{this.state.name}</span></p>
               <p> نام خانوادگی =<span  classNameName="font-weight-light">{this.state.family}</span></p>
               <p>سن=<span classNameName="font-weight-light">{this.state.age}</span></p>
               <p>جنسیت=<span classNameName="font-weight-light">{this.state.gender}</span></p>
               <p>آدرس=<span classNameName="font-weight-light">{this.state.address}</span></p>
               </div> */}
            
          

            </section>
        )
    }
}