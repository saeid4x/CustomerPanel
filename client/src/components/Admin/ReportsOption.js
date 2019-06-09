import React,{Component} from 'react';
import {Link} from 'react-router-dom';

export default class extends Component{

    render(){
        return(
            <section className="ReportsOption container">
                <h1>گزارش ها</h1>
                <hr/>
                <ul>
                    <li> <Link to="/admin/report/OrderFromBranch">گزارش  خرید از شعبه های مختلف  </Link></li>
                    <li> <Link to="/admin/report/complete">  گزارش کامل </Link></li>

                    </ul>

            </section>
        )
    }
}