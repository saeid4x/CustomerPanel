import React,{Component} from 'react';

export default class extends Component{

    state={
        data:[]
    }

    componentDidMount(){
        this.setState({
            data:this.props.data
        })
    }

    render(){
        let number=0;
        let tableInfo=this.state.data.length ? (
            this.state.data.map(item=>(
                <tr>
                        <td> {number+1} </td>
                        <td>{item.orderName } </td>
                        <td>{item.ordePrice} </td>
                        <td> {item.branchName} </td>
                        <td>  {item.orderDate}  </td>
                        <td>  {item.orderTime}  </td>
                        <td>  {item.orderPoint}  </td>
                </tr>
            ))
        ):null
        
        return(
            <section className="DetailsTable">
            <table className="DetailsTable-table">
                    <tr>
                    <th> #</th>
                    <th>کالا </th>
                    <th>قیمت </th>
                    <th> شعبه  </th>
                    <th>   تاریخ</th>
                    <th>   زمان</th>
                    <th> امتیاز  </th>
                    </tr>
                    {tableInfo}
                    
                </table>
               


            </section>
        )
    }
}