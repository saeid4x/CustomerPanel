import React ,{Component} from 'react';
import MainLayout from './mainLayout';
import Header from './General/Header'
import "../StaticFiles/css/HomePage.css";
import {Link} from 'react-router-dom';
export default class extends Component{

    render(){
        return(
            <section class="homepage ">
                <Header/>
                
                {/* <MainLayout/> */}
                <section className="homePage-content">

 
                <ul class="list-group">
                    <li class="list-group-item active"> <center> ورود به حساب </center></li>
                    <li class="list-group-item"><Link to="/login">ورود مشتری </Link></li>
                    <li class="list-group-item"><Link to="/adminBranch/addUser">ورود مدیر شعبه </Link></li>
                    <li class="list-group-item"> <Link to="">ورود مدیر </Link></li>
                     
                </ul>

                {/* <center>



                <h3>پنل مشتریان</h3>
                <Link to="/login/"><span className="btn btn-primary">ورود به حساب</span></Link>

                </center> */}

                 

        
                </section>
                


            </section>
        )
    }
}