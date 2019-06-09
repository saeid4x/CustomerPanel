import React,{Component} from 'react'
import Header from '../General/Header';
import SideNavigation from './SideNavigation';
 

export default class extends Component{

    state={
        mobile:localStorage.getItem('mobile'),
        userID:localStorage.getItem('userID'),
    }
componentDidMount(){
    if(localStorage.getItem('mobile')=='null'){
        this.props.history.push('/login')
    }
}
    render(){
        return(
            <section className="customerDashboard">
                <Header/>
                <SideNavigation/>
                <h1>this is customer Dashboard</h1>
                <h4>mobile : {this.state.mobile} </h4>

            </section>
            
        )
    }
}