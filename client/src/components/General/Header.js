import React,{Component} from 'react';

export default class extends Component{
    constructor(props){
        super(props);

    }

    state={
        showLogout:' '
    }

    logout=(e)=>{
        localStorage.removeItem('mobile');
        localStorage.removeItem('userID');
        window.location.href = "http://127.0.0.1:3000/login";
    }
    render(){
        return(
            <section className="Header">
            <nav className="navbar navbar-dark bg-primary text-white">
            <span>
                    <button onClick={this.logout} className="btn btn-outline-danger text-white" style={{display:`${this.state.showLogout}`}}>خروج</button>
                </span>
                <h4>سایت پنل مشتریان</h4>
               
  
            </nav>


            </section>
        )
    }

}