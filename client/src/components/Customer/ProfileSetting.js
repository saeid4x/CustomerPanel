import React ,{Component} from 'react';
import Header from '../General/Header';
import SideNavigation from './SideNavigation';
import "../../StaticFiles/css/Customer/ProfileSetting.css";
import {Link} from 'react-router-dom';

export default class extends Component{


    state={
        userID:null
    }
    componentDidMount(){
        this.setState({
            
            userID:localStorage.getItem('userID')
        })
    }
    render(){
        return(
            <section className="profileSetting">
                <Header/>
                <SideNavigation/>

                <section className="profileSetting-content">
                 <ul class="list-group">
                    <li class="list-group-item active"> <center>پروفایل </center></li>
                    <li class="list-group-item"><Link to={`/user/showProfile`}> مشاهده پروفایل</Link></li>
                    <li class="list-group-item"><Link to={`/user/editProfile`}>  ویرایش پروفایل  </Link></li>
                    
                </ul>


                    </section>

            </section>
        )
    }
}