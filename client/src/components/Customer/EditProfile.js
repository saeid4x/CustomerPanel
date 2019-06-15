import React ,{Component} from 'react';
import axios from 'axios';
import Keys from '../../config/keys';
import "../../StaticFiles/css/Customer/EditProfile.css"
import Header from '../General/Header'

export default class extends Component{

    state={
        name:null,
        family:null,
        age:null,
        gender:null,
        address:null,
        avatar:null,
          userID:localStorage.getItem('userID'),
          roleUser:localStorage.getItem('roleUser')

    }
    handleSubmit=(e)=>{
        e.preventDefault();

        let userID=localStorage.getItem('userID');
        let formData={
            name:this.name.value,
            family:this.family.value,
            age:this.age.value,
            address:this.address.value,
            avatar_img:this.avatar_img.value
           
        }
         


    }


    componentDidMount(){
        let userID=localStorage.getItem('userID');
        axios.get(Keys.backendUrl+'api/customer/'+userID+'/getProfile')
            .then((data)=>{
                if(data){
                    console.log(data.data)
                    this.setState({
                        name:data.data.name,
                        family:data.data.family,
                        age:data.data.age,
                        gender:data.data.gender,
                        address:data.data.address,
                        avatar:data.data.avatar,
                
                    })

                }
                else{
                    console.log('nothing');
                }
            }).catch((err)=>{
                console.log(err)
            })
    }


    render(){
        return(
            <section className="EditProfile">
                <Header/>
                <h3>ویرایش پروفایل</h3>
                <hr/>
                <div className="container EditProfie-form">
             <form  action={Keys.backendUrl+'api/customer/'+this.state.userID+'/setProfile'} method="POST" enctype="multipart/form-data">
                 <div className="form-group">
                     <label htmlFor="name">نام</label>
                     <input type="text" name="name" defaultValue={this.state.name} className="form-control" ref={(val)=>{this.name=val}}/>
                     <input type="hidden" name='roleUser' value={this.state.roleUser}/>
                 </div>
                 <div className="form-group">
                     <label htmlFor="family">نام خانوادگی</label>
                     <input type="text" name="family"  defaultValue={this.state.family}  className="form-control" ref={(val)=>{this.family=val}}/>
                     
                 </div>
                 <div className="form-group">
                     <label htmlFor="address">آدرس</label>
                     <input type="text" name="address"  defaultValue={this.state.name}  className="form-control" ref={(val)=>{this.address=val}}/>
                    
                 </div>
                 <div className="form-group">
                     <label htmlFor="age">سن</label>
                     <input   type="text" name="age"  defaultValue={this.state.age}  className="form-control" ref={(val)=>{this.age=val}}/>
                    
                 </div>
                 <div className="form-group">
                     <label htmlFor="gender">جنسیت</label>
                     {/* <input type="text" name="gender"  defaultValue={this.state.gender}  className="form-control" ref={(val)=>{this.gender=val}}/> */}
                     <select name="" id="" ref={(val)=>{this.gender=val}} name='gender' className="form-control">
                         <option value="male">مرد</option>
                         <option value="female">زن</option>
                     </select>
                    
                 </div>
                 <div className="form-group">
                     <label htmlFor="avatar_img">آپلود آواتار</label>
                 <input type="file" name="avatar_img" className="form-control" ref={(val)=>{this.avatar_img=val}}   />
                 </div>
                 
                    {/* <label className="custom-file-label" for="validatedCustomFile">انتخاب آواتار...</label> */}
                 <br/>
<button type="submit" className="btn btn-primary">تایید</button>


             </form>
             </div>
            </section>
        )
    }
}