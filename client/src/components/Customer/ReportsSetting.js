import React ,{Component} from 'react';
import Header from '../General/Header';
import SideNavigation from './SideNavigation';
import "../../StaticFiles/css/Customer/ReportSetting.css";
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
            <section className="ReportsSetting">
                <Header/>
                <SideNavigation/>

                <section className="ReportsSetting-content">
                 <ul class="list-group">
                    <li class="list-group-item active"> <center>گزارش ها </center></li>
                    <li class="list-group-item"><Link to={`/customer/${this.state.userID}/report/branchSpec`}> گزارش خرید از یک شعبه خاص</Link></li>
                    <li class="list-group-item"><Link to={`/customer/${this.state.userID}/report/complete`}> گزارش کامل</Link></li>
                    
                </ul>


                    </section>

            </section>
        )
    }
}