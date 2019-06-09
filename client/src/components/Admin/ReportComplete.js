import React,{Component} from 'react';

export default class extends Component{

    render(){
        return(
            <section className="ReportComplete container">
                <h2>گزارش کامل </h2>
                <hr/>
                <div className="form-group">
                    <h5>تاریخ</h5>
                    <label htmlFor="reportComplete-fromDate">از</label>
                    <input type="text" className="form-control" name="reportComplete-fromDate"/>
                </div>
                <div className="form-group">
                     
                    <label htmlFor="reportComplete-toDate">تا</label>
                    <input type="text" className="form-control" name="reportComplete-toDate"/>
                </div>
                <button type="submit" className="btn btn-primary">تایید</button>
                <hr/>
                <section className="reportComplete-details">
                <div>
                    <h4>تعداد شعبه ها</h4>
                    <span>[5]</span>
                </div>
                
                <div>
                    <h4>  تعداد کل سفارشات</h4>
                    <span>[10]</span>
                </div>
                <div>
                    <h4>مبلغ کل خرید</h4>
                    <span>[500.000]</span>
                </div>
{/* tabe located here... */}

                </section>
            </section>
        )
    }
}