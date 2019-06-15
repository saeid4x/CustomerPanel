import React,{Component} from 'react';
 import '../../StaticFiles/css/AdminBranch/SideNavAdminBranch.css'
 import {Link} from 'react-router-dom';
 import axios from 'axios';
 import Keys from '../../config/keys'
export default class extends Component{

    state={
        userID:null,
        mobile:null,
        avatar:null,
        roleUser:null
    }
    componentWillMount(){
        let userID=localStorage.getItem('userID');
        axios.get(Keys.backendUrl+'api/customer/getUser/'+userID)
        .then((data)=>{
            if(data){
                let username;
                if(data.data.username){
                    username=data.data.username
                    console.log(data.data.username)
                    this.setState({
                        username,
                        roleUser:localStorage.getItem('roleUser')
                    })
                }
                else{
                    this.setState({
                        username:localStorage.getItem('mobile'),
                        roleUser:localStorage.getItem('roleUser')
                    })
                }           
}
}) 
    }
    componentDidMount(){
        let userID=localStorage.getItem('userID');
        axios.get(Keys.backendUrl+'api/customer/'+userID+'/getProfile')
            .then((data)=>{
                if(data){
                    this.setState({
                        avatar:data.data.avatar
                    })
                }
            })

        
    }
    render(){
        return(
              <section className="adminBranch-sidenav">
                <section className="adminBranch-avatar">
                    <img src={`${Keys.backendUrl}uploads/images/${this.state.avatar}`} alt=""/>
                    <br/>
                    <span className="adminBranch-avatar-username">{this.state.username}</span><br/>
                    <span className="adminBranch-avatar-typeUser"> {this.state.roleUser}</span>
                </section>
                <section  className="adminBranch-category">
                    <ul>
                        <li> <Link to='/adminBranch/addUser'>  افزودن خرید  </Link></li>
                        <li> <Link to='/adminBranch/reportOrder'> گزارش ها</Link></li>
                        <li> <Link to='/adminBranch/profile'>پروفایل</Link></li>
                   
                        {/* <li> <Link to="">   گزارش گیری  </Link></li> */}
                    </ul>

                </section>
            </section>
        )
    }
}