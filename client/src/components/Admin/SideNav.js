import React,{Component} from 'react';
import "../../StaticFiles/css/Admin/SideNav.css";
import  {Link} from 'react-router-dom';

export default class extends Component{

    render(){
        return(
            <section className="adminSideNav">
            <section className="admin-avatar">
                    <img src="/static/img/img.png" alt=""/>
                    <br/>
                    <span className="admin-avatar-username">username</span><br/>
                    <span className="admin-avatar-typeUser">type user</span>
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