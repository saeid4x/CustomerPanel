import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Header from '../General/Header';
import SideNav from './SideNav';
import "../../StaticFiles/css/Admin/ReportsOption.css"


export default class extends Component{

    render(){
        return(
            <section className="ReportsOption">
                <Header/>
                <SideNav/>
                <section className="ReportsOption-content">

                <ul class="list-group">
                    <li class="list-group-item active"><center>گزارش ها </center></li>
                    <li class="list-group-item"> <Link to="/admin/report/OrderFromBranch"> مشاهده گزارش</Link>    </li>
                     
                 </ul>
                </section>
            </section>
        )
    }
}