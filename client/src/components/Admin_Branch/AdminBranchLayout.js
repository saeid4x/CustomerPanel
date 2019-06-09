import React ,{Component} from 'react';
import DashboardLayout from '../General/DashboardLayout';
// import "../../StaticFiles/css/AdminBranch/AdminBranchLayout.css";
import SideNav from './SideNav';
import AddOrder from './AddOrder';

export default class extends Component{

    render(){
        return(
            <section className="AdminBranchLayout">
                <DashboardLayout/>
                <SideNav/>
                <section className="adminBranch-content">
                    <AddOrder/>
                </section>


            </section>
        )
    }
}