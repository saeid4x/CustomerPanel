import React,{Component} from 'react';
import "../../StaticFiles/css/Admin/SideNav.css";
import  {Link} from 'react-router-dom';
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
            <section className="adminSideNav">
            <section className="admin-avatar">
                    <img src={`${Keys.backendUrl}uploads/images/${this.state.avatar}`} alt=""/>
                    <br/>
                    <span className="admin-avatar-username">{this.state.username}</span><br/>
                    <span className="admin-avatar-typeUser"> {this.state.roleUser}</span>
                </section>
                <hr/>
                <section  className="admin-category">
                    <ul>
                    <li> <Link to="/admin/addBranch">  افزودن شعبه    </Link></li>
                    <li> <Link to="/admin/addBranchAdmin">  افزودن مدیر شعبه    </Link></li>
                        <li> <Link to="/admin/settings">  تنظیمات    </Link></li>
                        <li> <Link to="/admin/report">  گزارش  </Link></li>
                    </ul>

                </section>
            </section>
        )
    }
}