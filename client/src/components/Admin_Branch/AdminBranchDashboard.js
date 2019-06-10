import React , {Component} from 'react';
import Header from '../General/Header';
import SideNav from './SideNav';
import CardTowRow from '../General/CardTowRow'

export default class extends Component {
    render(){
        return(
            <section className="AdminBranchDashboard">
                <Header/>
                <SideNav/>
                <section className="AdminBranchDashboard-content">
                <div className="row">
                    <div className="col-6">
                        <div style={{marginLeft:80,marginTop:20}}>
                        <CardTowRow cardTitle="مجموع کل خرید ها" cardValue='20' className="customerDashboard-cards"/>

                        </div>
                    </div>
                    <div className="col-6">
                    <div style={{marginLeft:80,marginTop:20}}>
                        <CardTowRow cardTitle=" تعداد کل خریدها" cardValue='2000' className="customerDashboard-cards"/>

                        </div>
                    </div>

                    </div>

                    <div className="row">
                    <div className="col-6">
                        <div style={{marginLeft:80,marginTop:20}}>
                            <CardTowRow cardTitle="تعداد مشتریان شعبه" cardValue='50' className="customerDashboard-cards"/>

                            </div>
                    </div>
                    </div>


                </section>

            </section>
        )
    }
}