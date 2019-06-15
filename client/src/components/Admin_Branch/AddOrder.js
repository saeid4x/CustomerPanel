import React,{Component} from 'react';
import "../../StaticFiles/css/AdminBranch/AddOrder.css"
import Keys from '../../config/keys';
import axios from 'axios';
import Header from '../General/Header';
import SideNav from './SideNav';
import Helper from '../../Controller/Helper'


export default class extends Component{


    state={
        ordersUser:[],
        baseprice:null,
        basePoint:null,
        minPointForMontlyLottery:null,
        minPointForYearlyLottery:null,
        prevPoint:null,
        finalPoint:null,
        name:null,
        family:null,
        customerMobile:localStorage.getItem('customerMobile'),


    }

    handleSubmit=(e)=>{
        e.preventDefault();

         /*
         // 1--> get Prev point
         //2-->insert order for customer
         //3--> insert customer to correct lottery(if neccerily)


         */

        //  1--> get Prev point
        let customerID=localStorage.getItem('customerID');
        axios.get(Keys.backendUrl+'api/adminBranch/'+customerID+'/getTotalPoints')
            .then((data)=>{
                if(data){
                    // console.log('175',data.data.totalPoint);
                    this.setState({
                        prevPoint:data.data.totalPoint
                    })
                }
            }).then(()=>{
                // console.log('176',this.state.prevPoint);
                //caculate orderPoint and insert order for Customer

                let PointThisOrder=Math.floor((this.orderPrice.value / this.state.basePrice)) * this.state.basePoint;
                var finalPoint=this.state.prevPoint + PointThisOrder;
                let customerID=localStorage.getItem('customerID');
                this.setState({
                    finalPoint
                })
                let formData={
                    customerID:localStorage.getItem('customerID'),
                    orderName:this.orderName.value,
                    orderPrice:this.orderPrice.value,
                    BranchID:localStorage.getItem('BranchID'),
                    BranchName:localStorage.getItem('BranchName'),
                    orderPoint:PointThisOrder
                }
             

                axios.post(Keys.backendUrl+'api/adminBranch/order/addOrder',formData)
                    .then((data)=>{
                        if(data){
                            // console.log(data.data);
                           
                        }
                    }) .then(()=>{
                        //insert customer to lottery table
                        console.log('final point=',finalPoint);
                        var lotteryType;
                        var customerID=localStorage.getItem('customerID');
                       
                        if(this.state.finalPoint >= this.state.minPointForMontlyLottery && this.state.finalPoint <this.state.minPointForYearlyLottery ){
                            //insert user to lottery collection
                             lotteryType='montly';
                          
                        }
                          if(this.state.finalPoint >= this.state.minPointForYearlyLottery){
                             
                              lotteryType='yearly'
                           
                        }

//****************************************************** */
                        let data2={
                            lotteryType,
                            customerMobile:localStorage.getItem('customerMobile')
                             
                        }
                        axios.post(Keys.backendUrl+'api/adminBranch/'+customerID+'/addToLottery',data2)
                        .then((data)=>{
                            if(data){
                               console.log('@207',data.data);
                               window.location.href=Keys.frontendUrl+"adminBranch/addOrder"

                            }
                            else{
                                console.log('@207','no-data');
                                window.location.href=Keys.frontendUrl+"adminBranch/addOrder"
                            }
                        }).then(()=>{
                            window.location.href=Keys.frontendUrl+"adminBranch/addOrder"
                        }).catch((err)=>{
                            console.log(err)
                        })
                    })
            });
    }
   
  componentWillMount(){
      axios.get(Keys.backendUrl+'api/adminBranch/getPointDefinition')
        .then((data)=>{
            if(data){
                this.setState({
                    basePrice:data.data.basePrice,
                    basePoint:data.data.basePoint,
                    minPointForMontlyLottery:data.data.minPointForMontlyLottery,
                    minPointForYearlyLottery:data.data.minPointForYearlyLottery

                })
            }
        }).then(()=>{
             
        })
  }
    componentDidMount(){




        // let userID=this.props.match.params.userID;
        let userID=localStorage.getItem('customerID')
        axios.get(Keys.backendUrl+'api/customer/'+userID+'/getProfile')
            .then((data)=>{

                if(data){
                    console.log('6060',data.data.name)
                    this.setState({
                        name:data.data.name,
                            family:data.data.family,
                    })
                    localStorage.setItem('customerName',data.data.name);
                    localStorage.setItem('customerFamily',data.data.family);
                }
            }).then(()=>{
                console.log('5050',this.state.name)
            })
        console.log(userID);
        axios.get(Keys.backendUrl+'api/adminBranch/order/getDetailsOrder/'+userID)
            .then((data)=>{
                if(data){
                    console.log('808080',data.data);
                    this.setState({
                        ordersUser:data.data
                    })


                }
            })
    }
 
    render(){
        var fieldNumber=1;
        console.log('10000',this.state.ordersUser)
        let ordersUser=this.state.ordersUser.length ?(
            this.state.ordersUser.map(item=>(
                 <tr>
                        <td>  {fieldNumber++} </td>
                        <td>    {item.orderName}  </td>
                        <td>   {item.orderPrice} </td>
                        <td>  {localStorage.getItem('customerMobile')} </td>   
                        <td>  {item.branchName} </td>
                        <td> {`${Helper.ToShamsi(Helper.MilisecondToMiladi( item.orderDate ))}`} </td>

                        <td> {item.orderTime} </td>
                    </tr>

            ))
        ):(<div></div>);
        return(
            <section className="addOrder">
            <Header/>
            <SideNav/>
                <section className="addOrder-infoCustomer">
                    
                 
                    <ul class="list-group addOrder-customerInfo">
                        <li class="list-group-item active">مشخصات مشتری</li>
                        <li class="list-group-item"> نام = {this.state.name}</li>
                        <li class="list-group-item"> نام خانوادگی = {this.state.family}</li>
                        <li class="list-group-item">  موبایل مشتری   = {this.state.customerMobile}</li>
                      
                </ul>
                    {/* *********** */}

                 
                   
                </section>
<hr className="addOrder-hr"/>
                <section className="addOrder-add">
              <center>  <h4>وارد کردن کالا</h4></center>
                    <form onSubmit={this.handleSubmit}>
                        <section className="addOrder-add"></section>
                        <div className="form-group">                            
                            <label htmlFor="orderName">نام کالا </label>
                            <input type="text" id="orderName"   className="form-control" ref={(input)=>{this.orderName=input}}/>
                        </div>
                        <div className="form-group">                            
                            <label htmlFor="orderPrice">قیمت کالا </label>
                            <input type="text" id="orderPrice" className="form-control"   ref={(input)=>{this.orderPrice=input}}/>
                        </div>
                        <button className="btn btn-primary" type="submit">افزودن</button>
                    </form>

                </section>
                <hr/>
                <section className="addOrder-detailsOrder">
                    {/* <h4>جزئیات خرید <span>سعید ایمانی </span><span>- 09905086089</span></h4>
                    <div><span></span></div> */}
                </section>

                

                <section className="addOrder-detailsOrder-table">
                <table className=" table CompleteReport-table bg-primary">
                    <tr>
                    <th> #</th>
                    <th>کالا </th>                    
                    <th> مبلغ خرید</th>
                    <th>کاربر</th>
                    <th> شعبه  </th>
                    <th> تاریخ خرید  </th>
                    <th> زمان خرید  </th>
                    </tr>
                     {ordersUser}
                </table>
                </section>


            </section>
        )
    }
}