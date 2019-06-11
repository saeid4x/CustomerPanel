import React, {Component} from 'react';
 import "../../StaticFiles/css/Customer/SideNavigation.css";
 import axios from 'axios';
 import Keys from '../../config/keys';
 import {Link} from 'react-router-dom'

export default class extends Component{

    state={
        avatar:null,
        username:null,
        roleUser:null,

    }
    componentWillMount(){
      
        let userID=localStorage.getItem('userID');
        console.log(userID);
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
            <section className="SideNavigation">
                <section className="customerSideNav-avatar">
                    <img src={`${Keys.backendUrl}uploads/images/${this.state.avatar}`} alt={this.state.avatar}/>
                    <br/>
                    <span className="customerSideNav-avatar-username">{this.state.username}</span><br/>
                    <span className="customerSideNav-avatar-typeUser"> {this.state.roleUser}</span>
                </section>
                <hr/>
                <section  className="customerSideNav-category">
                    <ul>
                        <li> <Link to="/customer/report/setting">گزارش    </Link></li>
                        <li> <Link to="/customer/profile">    پروفایل </Link></li>
                    </ul>

                </section>
            </section>
        )
    }
}