import React from 'react';
 import {BrowserRouter as Router , Route ,Switch} from 'react-router-dom';
//  import PG from './components/test/PG';
 
// import TestLayout from './components/test/TestLayout';
// import DateTime from './components/test/DateTime';
import HomePage from './components/HomePage';
import Login from './components/Login';
import PasswordEnter from './components/PasswordEnter';
import PasswordForgot from './components/PasswordForgot';
import VerifyCode from './components/General/EnterVerificationCode';
import CompleteRegister from './components/Customer/CompleteRegister';
import CustomerDashboard from './components/Customer/CustomerDashboard';
import AddBranch from './components/Admin/AddBranch';
import Settings from './components/Admin/Setting';
import AddBranchAdmin from './components/Admin/AddBranchAdmin';
import PointsWithOrder from './components/Admin/PointsWithOrder';
import PointsOrderOtherBranch from './components/Admin/PointsWithOrderFromOtherBranch';
import LotteryOption from './components/Admin/LotteryOption';
import AdminDashboard from './components/Admin/AdminDashboard';
import ReportOrderFromBranch from './components/Admin/ReportOrderFromBranch';
import ReportComplete from './components/Admin/ReportComplete';
import ReportsOption from './components/Admin/ReportsOption';
import AddOrder from './components/Admin_Branch/AddOrder';
import AddUser from './components/Admin_Branch/AddUser'
import AdminBranchDashboard from './components/Admin_Branch/AdminBranchDashboard'

// import Parent from './components/test/Parent';

import EditProfile from './components/Customer/EditProfile';
import ShowProfile from './components/Customer/ShowProfile';
import ProfileSetting from './components/Customer/ProfileSetting';

import ReportBranchSpec from './components/Customer/ReportBranchSpec';
import DetailsTable from './components/Customer/DetailsTable';
import CompleteReport from './components/Customer/CompleteReport';
import ReportSetting from './components/Customer/ReportsSetting';
import SideNavigation from './components/Customer/SideNavigation';
import CardTowRow from './components/General/CardTowRow';

 





function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/login/password" component={PasswordEnter} />
          <Route  path="/login/forgotPassword" component={PasswordForgot} />
          <Route  exact path="/user/:mobile/verifyCode" component={VerifyCode} />

          <Route  path="/user/register/" component={CompleteRegister} />
          <Route  path="/customer/dashboard" component={CustomerDashboard} />
          {/* <Route  path="/customer/:userID/editProfile" component={EditProfile} />
          <Route  path="/customer/:userID/profile" component={ShowProfile} /> */}
          <Route  path="/customer/:userID/report/branchSpec" component={ReportBranchSpec} />
          <Route  path="/customer/:userID/report/complete" component={CompleteReport} />
          <Route  path="/customer/report/setting" component={ReportSetting} />

          <Route  path="/customer/showProfile" component={ShowProfile} />
          <Route  path="/customer/editProfile" component={EditProfile} />
          <Route  path="/customer/profile" component={ProfileSetting} />
           
          


          
          <Route  path="/admin/addBranch" component={AddBranch} />
          <Route  path="/admin/addBranchAdmin" component={AddBranchAdmin} />
          <Route  path="/admin/pointsWithOrder" component={PointsWithOrder} />
          <Route  path="/admin/pointsOrderOtherBranch" component={PointsOrderOtherBranch} />
          <Route  path="/admin/settings" component={Settings} />
          
          <Route  path="/admin/lotteryOption" component={LotteryOption} />
          <Route  path="/admin/dashboard" component={AdminDashboard} />
          <Route  path="/admin/report/OrderFromBranch" component={ReportOrderFromBranch} />
          <Route  path="/admin/report/complete" component={ReportComplete} />
          <Route exact path="/admin/report" component={ReportsOption} />

          <Route exact path="/adminBranch/addOrder/:userID/:userMobile" component={AddOrder} />
          <Route exact path="/adminBranch/addUser" component={AddUser} />
          <Route exact path="/adminBranch/dashboard" component={AdminBranchDashboard} />

          <Route path="/test" component={AdminBranchDashboard}/>
          <Route path="/test2" component={CustomerDashboard}/>
          {/* <Route path="/test3" component={DateTime}/> */}
           
        </Switch>
      </Router>

       
    </div>
  );
}

export default App;
