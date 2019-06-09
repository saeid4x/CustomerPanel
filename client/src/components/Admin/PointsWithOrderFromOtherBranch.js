import React  , {Component} from 'react';
import axios from 'axios';
import Keys from '../../config/keys';
import "../../StaticFiles/css/Admin/PointFromOtherBranch.css";
import Header from '../General/Header';
import SideNav from './SideNav'

export default class extends Component{

    state={
        pointsManyBranch:[]
    }

    handleSubmit=(e)=>{
        e.preventDefault();

        let isMontlyLottery=null;
        let isYearlyLottery=null;
        if(this.grantLotteryPermission.value == 'montlyLottery'){
            isMontlyLottery=1;
        }
        else if(this.grantLotteryPermission.value == 'YearlyLottery'){
            isYearlyLottery=1;
        }
        console.log('1000=',isMontlyLottery);
        console.log('1000=',isYearlyLottery);
        let formData={
            NumberBranch:this.numberOfBranch.value,
            point:this.point.value,
            // grantLotteryPermission:this.grantLotteryPermission.value,
            isMontlyLottery,
            isYearlyLottery
        };

        axios.post(Keys.backendUrl+'api/admin/pointsOrderManyBranch',formData);
             

        

    }


    componentDidMount(){

        axios.get(Keys.backendUrl+'api/admin/pointsOrderManyBranch')
            .then((data)=>{
                if(data){
                    console.log(data.data);
                    this.setState({
                        pointsManyBranch:data.data

                    })
                }
            })
        }
    handleClickPoints=()=>{
        console.log('hello');
    }
    render(){
        /*

{item.NumberBranch}  
{item.point}

        */
        var detailsInfo= this.state.pointsManyBranch.length ?( 
            this.state.pointsManyBranch.map(item=>(<div>
                <li class="list-group-item">
                <span> خرید از {item.NumberBranch}شعبه  برابر  {item.point} امتیاز </span>
                <span style={{float:'left'}} onClick={this.handleClickPoints} className="btn btn-danger deleteBtn"> 
                    <a style={{color:'white'}} href={`${Keys.backendUrl}api/admin/deletePointOrderManyBranch/${item._id}`}>حذف</a>
                    </span>
                
                   </li>

            </div>))
        ):(<div></div>)
        return(
            <section className="PointsOrderOtherBranch">
                <Header/>
                <SideNav/>
             <center> <h1>امتیازدهی بر اساس خرید از شعبه های مختلف </h1></center>  
                <hr/>
                <section className="PointsOrderOtherBranch-content">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="numberOfBranch">خرید از </label>
                        <input type="text" className="form-control" id="numberOfBranch" ref={(input)=>{this.numberOfBranch=input}}/>                      
                        <span>شعبه</span>
                    </div>
                    <span>=</span>
                        <br/>
                        <div className="form-group">
                           <input type="text" className="form-control" ref={(data)=>{this.point=data}}/>
                           <span>امتیاز</span> 
                        </div>
                        <hr/>
                        <div className="form-group">
                            <label htmlFor="grantLotteryPermission">مجوز قرعه کشی</label>
                            <select name="grantLotteryPermission" className="form-control" ref={(val)=>{this.grantLotteryPermission=val}}>
                                <option  selected >انتخاب کنید...</option>
                                <option value="montlyLottery">قرعه کشی ماهیانه</option>
                                <option value="YearlyLottery">قرعه کشی سالیانه</option>
                                </select>                       
                        

                        </div> 
                        <button type="submit"  className="btn btn-primary">افزودن</button>
                </form>
                <section className="pointWithOtherBranch-details">
                <ul class="list-group">
                    <li class="list-group-item active">جزییات امتیازدهی</li>
                    
                    {detailsInfo}
                </ul>


                      {/* <ul>
                     
                    </ul>  */}
                </section>
                
                </section>

             
                
             
            </section>
 

        )
    }
}