import React,{Component} from 'react';
 import '../../StaticFiles/css/AdminBranch/SideNavAdminBranch.css'
 import {Link} from 'react-router-dom'
export default class extends Component{

    state={
        userID:null,
        userMobile:null
    }
    componentDidMount(){
        this.setState({
            userID:localStorage.getItem('userID'),
            userMobile:localStorage.getItem('userMobile')
        })
    }
    render(){
        return(
              <section className="adminBranch-sidenav">
                <section className="adminBranch-avatar">
                    <img src="/static/img/img.png" alt=""/>
                    <br/>
                    <span className="adminBranch-avatar-username">username</span><br/>
                    <span className="adminBranch-avatar-typeUser">type user</span>
                </section>
                <section  className="adminBranch-category">
                    <ul>
                        <li> <Link to={`/adminBranch/addOrder/${this.state.userID}/${this.state.userMobile}`} >  افزودن خرید  </Link></li>
                        <li> <Link to="">   گزارش گیری  </Link></li>
                    </ul>

                </section>
            </section>
        )
    }
}