import React , {Component} from 'react';
import Header from '../General/Header';
import SideNav from './SideNav';
import CardTowRow from '../General/CardTowRow'
import axios from 'axios';
import Keys from '../../config/keys';



export default class extends Component {
    state={
        countOfOrder:null,
        sumOfPrices:null,
        countOfCustomer:null,
        

    }
    componentWillMount(){
        let adminBranch=localStorage.getItem('userID');
        axios.get(Keys.backendUrl+'api/adminBranch/getBranchInfo/'+adminBranch)
            .then((data)=>{
                if(data){
                    localStorage.setItem('currentBranchName',data.data.branchName);
                    localStorage.setItem('currentBranchID',data.data._id);
                }
            })

    }

    componentDidMount(){
        //get branchID and fetch data based that identifier
        let branchID='branchID 20';
        axios.get(Keys.backendUrl+'api/adminBranch/'+branchID+'/getDashboardInfo')
            .then((data)=>{
                if(data.data){
                    console.log(data.data);
                    this.setState({
                        countOfOrder:data.data.count,
                        sumOfPrices:data.data.totalPrice,

                    })
                }
            }).then(()=>{
                axios.get(Keys.backendUrl+'api/adminBranch/'+branchID+'/countOfCustomer')
                    .then((data)=>{
                        if(data.data){
                            console.log('550',data.data.customerCount)
                            this.setState({
                                countOfCustomer:data.data.customerCount
                            })
                        }
                    })
            })
        
    }
    render(){
        return(
            <section className="AdminBranchDashboard">
                <Header/>
                <SideNav/>
                <section className="AdminBranchDashboard-content">
                <div className="row">
                    <div className="col-6">
                        <div style={{marginLeft:80,marginTop:20}}>
                        <CardTowRow cardTitle="مجموع کل خرید ها" cardValue={`${this.state.sumOfPrices} تومان`} className="customerDashboard-cards"/>

                        </div>
                    </div>
                    <div className="col-6">
                    <div style={{marginLeft:80,marginTop:20}}>
                        <CardTowRow cardTitle=" تعداد کل خریدها" cardValue={this.state.countOfOrder} className="customerDashboard-cards"/>

                        </div>
                    </div>

                    </div>

                    <div className="row">
                    <div className="col-6">
                        <div style={{marginLeft:80,marginTop:20}}>
                            <CardTowRow cardTitle="تعداد مشتریان شعبه" cardValue={this.state.countOfCustomer} className="customerDashboard-cards"/>

                            </div>
                    </div>
                    </div>


                </section>

            </section>
        )
    }
}