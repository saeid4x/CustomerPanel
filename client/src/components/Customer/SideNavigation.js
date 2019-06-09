import React, {Component} from 'react';
 import "../../StaticFiles/css/Customer/SideNavigation.css";

export default class extends Component{
    componentDidMount(){
     
    }
    render(){
        return(
            <section className="SideNavigation">
                <section className="customerSideNav-avatar">
                    <img src="/static/img/img.png" alt=""/>
                    <br/>
                    <span className="customerSideNav-avatar-username">username</span><br/>
                    <span className="customerSideNav-avatar-typeUser">type user</span>
                </section>
                <hr/>
                <section  className="customerSideNav-category">
                    <ul>
                        <li> <a href="/customer/report/setting">گزارش    </a></li>
                        <li> <a href="/customer/profile">    پروفایل </a></li>
                    </ul>

                </section>
            </section>
        )
    }
}