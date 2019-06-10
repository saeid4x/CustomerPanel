import React ,{Component} from 'react';
import "../../StaticFiles/css/General/CardTwoRow.css";
export default class extends Component{

    render(){
        return(
            <section className="CardTwoRow">
                <section className="CardTwoRow-content row">
                    <div className="col-12">{this.props.cardTitle}</div>
                    <div className="col-12"><hr/></div>
                    
                    <div className="col-12">{this.props.cardValue}</div>
                



                </section>

            </section>
        )
    }
}