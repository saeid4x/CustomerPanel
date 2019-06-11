import React,{Component} from 'react'
import Header from '../General/Header';
import SideNavigation from './SideNavigation';
import CardTowRow from '../General/CardTowRow';
import "../../StaticFiles/css/Customer/CustomerDashboard.css"
import Axios from 'axios';
import Keys from '../../config/keys';

 

export default class extends Component{

    state={
        mobile:localStorage.getItem('mobile'),
        userID:localStorage.getItem('userID'),
        totalOredr:null,
        countOrder:null,
        totalPoint:null,
        username:null,
        roleUser:null,
    }

componentDidMount(){
    if(localStorage.getItem('mobile')=='null'){
        this.props.history.push('/login')
    }
    let userID=localStorage.getItem('userID');
    
    Axios.get(Keys.backendUrl+'api/customer/'+userID+'/orders/totalPriceAndCountOrder')
        .then((data)=>{
            if(data){
                this.setState({
                    totalOredr:data.data.total,
                    countOrder:data.data.count,
                    totalPoint:data.data.totalPoint

                })
                 
            }
        }).then(()=>{
           
})
}
    render(){
        return(
            <section className="customerDashboard">
                <Header/>
                <SideNavigation/>
                <section className="customerDashboard-content">
                    <div className="row">
                    <div className="col-6">
                        <div style={{marginLeft:80,marginTop:20}}>
                        <CardTowRow cardTitle="تعداد خریدها" cardValue={this.state.countOrder} className="customerDashboard-cards"/>

                        </div>
                    </div>
                    <div className="col-6">
                    <div style={{marginLeft:80,marginTop:20}}>
                        <CardTowRow cardTitle="مجموع کل خریدها" cardValue={this.state.totalOredr} className="customerDashboard-cards"/>

                        </div>
                    </div>

                    </div>

                    <div className="row">
                    <div className="col-6">
                        <div style={{marginLeft:80,marginTop:20}}>
                            <CardTowRow cardTitle=" امتیازات" cardValue={this.state.totalPoint} className="customerDashboard-cards"/>

                            </div>
                    </div>
                    <div className="col-6">
                        <div style={{marginLeft:80,marginTop:20}}>
                            <CardTowRow cardTitle="مجموع کل خریدها" cardValue="50000 تومان" className="customerDashboard-cards"/>

                            </div>
                    </div>


                    </div>
                </section>
                
            </section>
            
        )
    }
}