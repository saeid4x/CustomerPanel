import React,{Component} from 'react';
import "../../StaticFiles/css/AdminBranch/AddOrder.css"
import Keys from '../../config/keys';
import axios from 'axios';
import Header from '../General/Header';
import SideNav from './SideNav';


export default class extends Component{


    state={
        ordersUser:[],
        baseprice:null,
        basePoint:null,
        minPointForMontlyLottery:null,
        minPointForYearlyLottery:null,
        prevPoint:null,
        userProfile:{
            name:null,
            family:null,
            userMobile:this.props.match.params.userMobile
        },



    }

    handleSubmit=(e)=>{
        e.preventDefault();

        // let branchID:localStorage.getItem('branchID')
        let userID='user120';
        axios.get(Keys.backendUrl+'api/adminBranch/'+userID+'/getTotalPoints')
            .then((data)=>{
                if(data){
                    // console.log('175',data.data.total);
                    this.setState({
                        prevPoint:data.data.total
                    })
                }
            }).then(()=>{
                // console.log('176',this.state.prevPoint)

                let PointThisOrder=Math.floor((this.orderPrice.value / this.state.basePrice)) * this.state.basePoint;
                let newPoint=this.state.prevPoint + PointThisOrder;


                let formData={
                    userID:this.props.match.params.userID,
                    orderName:this.orderName.value,
                    orderPrice:this.orderPrice.value,
                    branchID:'5cf7a931e8055f1434b94a50',
                    orderPoint:PointThisOrder
                }

                axios.post(Keys.backendUrl+'api/adminBranch/order/addOrder',formData)
                    .then((data)=>{
                        if(data){
                            console.log(data.data)
                        }
                    });

          //set user to lottery table
           if(newPoint >= this.state.minPointForMontlyLottery){
               //insert user to lottery collection
               let lotteryType='montly'
               
               axios.get(Keys.backendUrl+'api/adminBranch/'+userID+'/addToLottery/'+lotteryType)
                .then((data)=>{
                    console.log(data.data)
                })
               

           }
           else if(newPoint >= this.state.minPointForYearlyLottery){
               //insert user to lottery collection
               //lotteryType='yearly'
               let lotteryType='yearly'
               
               axios.get(Keys.backendUrl+'api/adminBranch/'+userID+'/addToLottery/'+lotteryType)
                .then((data)=>{
                    console.log(data.data)
                })
           }
                

            });  

            // axios.post(Keys.backendUrl+'api/adminBranch/order/addOrder',formData)
             
            //     .then((data)=>{
            //         if(data.data){
            //             console.log(data.data);
                        
                    
            //         }//end if
            //     })
 
       
        
    }
   
  componentWillMount(){
      axios.get(Keys.backendUrl+'api/adminBranch/getPointDefinition')
        .then((data)=>{
            if(data){
                this.setState({
                    baseprice:data.data.basePrice,
                    basePoint:data.data.basePoint,
                    minPointForMontlyLottery:data.data.minPointForMontlyLottery,
                    minPointForYearlyLottery:data.data.minPointForYearlyLottery

                })
            }
        })
  }
    componentDidMount(){




        let userID=this.props.match.params.userID;
        axios.get(Keys.backendUrl+'api/'+userID+'/profile')
            .then((data)=>{
                if(data){
                    this.setState({
                        uesrProfile:{
                            name:data.data.name,
                            family:data.data.family
                        }
                    })
                }
            })
        console.log(userID);
        axios.get(Keys.backendUrl+'api/adminBranch/order/getDetailsOrder/'+userID)
            .then((data)=>{
                if(data){
                    // console.log(data.data);
                    this.setState({
                        ordersUser:data.data
                    })


                }
            })
    }
 
    render(){
        var fieldNumber=1;
        let ordersUser=this.state.ordersUser.length ?(
            this.state.ordersUser.map(item=>(
                 <tr>
                        <td>  {fieldNumber++} </td>
                        <td>    {item.orderName}  </td>
                        <td>   {item.orderPrice} </td>
                        <td>  {item.userID} </td>   
                        <td>  {item.branchID} </td>
                        <td>  {item.orderDate}  </td>
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
                        <li class="list-group-item"> نام = {this.state.userProfile.name}</li>
                        <li class="list-group-item"> نام خانوادگی = {this.state.userProfile.family}</li>
                        <li class="list-group-item">  موبایل مشتری   = {this.state.userProfile.userMobile}</li>
                      
                </ul>
                    {/* *********** */}

                 
                   
                </section>
<hr className="addOrder-hr"/>
                <section className="addOrder-add container">
              <center>  <h4>وارد کردن کالا</h4></center>
                    <form onSubmit={this.handleSubmit}>
                        <section className="addOrder-add"></section>
                        <div className="form-group">                            
                            <label htmlFor="orderName">نام کالا </label>
                            <input type="text" id="orderName" className="form-control" ref={(input)=>{this.orderName=input}}/>
                        </div>
                        <div className="form-group">                            
                            <label htmlFor="orderPrice">نام کالا </label>
                            <input type="text" id="orderPrice" className="form-control"  ref={(input)=>{this.orderPrice=input}}/>
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
                <table className=" table CompleteReport-table">
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