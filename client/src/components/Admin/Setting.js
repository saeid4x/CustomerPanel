import React,{Component} from 'react';
import Header from '../General/Header';
import SideNav from './SideNav';
import {Link} from 'react-router-dom';
import "../../StaticFiles/css/Admin/Setting.css"
export default class extends Component{

    render(){
        return(
            <section className="setting">
                <Header/>
                <SideNav/>
                <section className="setting-content">
                <ul class="list-group">
                <li class="list-group-item active"> <center>صفحه تنظیمات</center></li>
                    <li class="list-group-item "><Link to="/admin/pointsWithOrder">امتیازدهی بر اساس میزان خرید</Link></li>
                    <li class="list-group-item "><Link to="/admin/pointsOrderOtherBranch"> امتیازدهی بر اساس خرید از شعبه</Link></li>
                    <li class="list-group-item "><Link to="/admin/lotteryOption">  تنظیمات قرعه کشی</Link></li>
               
                   
                   
                </ul>
                </section>

            </section>
        )
    }
}