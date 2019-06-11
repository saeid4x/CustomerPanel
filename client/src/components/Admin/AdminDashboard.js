import React,{Component} from 'react';
 import Header from '../General/Header';
 import SideNav from './SideNav';
 import CardTowRow from '../General/CardTowRow';
 import axios from 'axios';
 import Keys from '../../config/keys'


export default class extends Component{

    state={
        countBranches:null,
    }

    componentDidMount(){

        axios.get(Keys.backendUrl+'api/admin/dashboard/countOfBranches')
            .then((data)=>{
                if(data.data){
                    console.log(data.data.count);
                    this.setState({
                        countBranches:data.data.count
                    })
                }
            });

    


    }
    render(){
        return(
            <section className="AdminDashboard">
                <Header/>
                <SideNav/>
                <section className="AdminDashboard-content">
                <div className="row">
                    <div className="col-6">
                        <div style={{marginLeft:80,marginTop:20}}>
                        <CardTowRow cardTitle="تعداد شعبه ها" cardValue={`${this.state.countBranches} شعبه`} className="customerDashboard-cards"/>

                        </div>
                    </div>
                    <div className="col-6">
                        <div style={{marginLeft:80,marginTop:20}}>
                            <CardTowRow cardTitle=" تعداد کل مشتریان" cardValue='3' className="customerDashboard-cards"/>

                            </div>
                    </div>
                    {/* <div className="col-6">
                    <div style={{marginLeft:80,marginTop:20}}>
                        <CardTowRow cardTitle="ارزش کل خریدها" cardValue='12' className="customerDashboard-cards"/>

                        </div>
                    </div> */}

                    </div>
 
                </section>
            </section>
        )
    }
}